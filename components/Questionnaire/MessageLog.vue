<template>
  <v-card outlined class="mb-3" style="flex-grow: 1; display:grid; grid-template-rows: max-content auto">
    <v-card-title class="subtitle-1">{{ title }}</v-card-title>
    <v-card-text style="display: grid; grid-template-rows: max-content auto">
      <v-btn small @click="clearLog" class="mb-2">
        <v-icon left small>mdi-delete</v-icon>
        Clear Log
      </v-btn>
      <div
        style="
          max-height: 300px;
          overflow-y: auto;
          background: #f5f5f5;
          padding: 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
        "
      >
        <div v-if="messages.length === 0" style="color: #999">
          No messages yet...
        </div>
        <div v-for="(msg, idx) in messages" :key="idx" class="mb-1">
          <strong
            :style="{
              color: getDirectionColor(msg.direction),
            }"
          >
            {{ getDirectionLabel(msg.direction) }}
          </strong>
          <span style="color: #666"> [{{ msg.timestamp }}]</span>
          <strong> {{ msg.type }}</strong>
          <div style="margin-left: 20px; color: #666">
            {{ msg.summary }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import { MessageLogEntry } from "~/helpers/message-logger";

@Component
export default class MessageLog extends Vue {
  @Prop({ type: Array, required: true }) readonly messages!: MessageLogEntry[];
  @Prop({ type: String, default: "Message Log" }) readonly title!: string;

  getDirectionColor(direction: string): string {
    switch (direction) {
      case "sent":
        return "#1976d2"; // Blue
      case "received":
        return "#388e3c"; // Green
      case "local":
        return "#f57c00"; // Orange
      default:
        return "#666"; // Gray
    }
  }

  getDirectionLabel(direction: string): string {
    switch (direction) {
      case "sent":
        return "→ SENT";
      case "received":
        return "← RECV";
      case "local":
        return "⊙ LOCAL";
      default:
        return "• " + direction.toUpperCase();
    }
  }

  @Emit("clear")
  clearLog() {
    // Emit event to parent to clear the log
  }
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
