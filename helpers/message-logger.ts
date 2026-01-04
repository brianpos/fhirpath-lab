/**
 * Message Log Types and Utilities for SMART Web Messaging
 */

export interface MessageLogEntry {
  direction: "sent" | "received" | "local";
  timestamp: string;
  type: string;
  summary: string;
  data?: any;
}

/**
 * Creates a new message log entry with the current timestamp
 */
export function createMessageLogEntry(
  direction: "sent" | "received" | "local",
  type: string,
  summary: string,
  data?: any
): MessageLogEntry {
  return {
    direction,
    timestamp: new Date().toLocaleTimeString(),
    type,
    summary,
    data,
  };
}

/**
 * Maintains a message log with a maximum size
 */
export class MessageLogger {
  private messages: MessageLogEntry[] = [];
  private maxSize: number;

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize;
  }

  log(
    direction: "sent" | "received" | "local",
    type: string,
    summary: string,
    data?: any
  ): void {
    this.messages.push(createMessageLogEntry(direction, type, summary, data));
    
    // Keep only last maxSize messages
    if (this.messages.length > this.maxSize) {
      this.messages.shift();
    }
  }

  getMessages(): MessageLogEntry[] {
    return this.messages;
  }

  clear(): void {
    this.messages = [];
  }
}
