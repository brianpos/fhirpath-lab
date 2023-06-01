<template>
  <v-card>
    <v-card-title>Ask FhirPath AI</v-card-title>
    <v-card-text>
      <div class="messages" ref="messagesContainer">
        <div>
          <div class="message message-left">
            <div class="message-content">
              <v-icon>mdi-brain</v-icon>
              <span class="message-user">FhirPath AI</span>: <p>How can I help you?</p>
            </div>
          </div>
        </div>
        <div v-for="(message, index) in messages" :key="index">
          <div
            :class="[
              'message',
              message.user === 'Author'
                ? 'message-right'
                : 'message-left',
            ]"
            v-show="message.visible"
          >
            <div class="message-content">
              <v-icon>
                {{
                  message.user === "Author"
                    ? "mdi-face-man"
                    : message.user === "System"
                    ? "mdi-information-outline"
                    : "mdi-brain"
                }}
              </v-icon>
              <span class="message-user">{{ message.user }}</span
              >: <span style="pointer-events: none;" @click="applySuggestion" v-html="convertHtml(message.text)" />
            </div>
          </div>
        </div>
      </div>
      <div class="messages suggestions" v-if="messages.length == 0">
        <div v-for="(message, index) in suggestions" :key="index">
          <div class="message message-right" @click="sendAuthorMessage(message)">
            <div class="message-content">
              <span v-text="message" />
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-tooltip bottom >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon 
            v-bind="attrs" v-on="on"
            @click="resetConversation"><v-icon>mdi-broom</v-icon></v-btn>
        </template>
        <span>Reset chat</span>
      </v-tooltip>
      <v-textarea
        label="Message"
        rows="3"
        v-model="newMessage"
        clearable
        :loading="thinking"
        @keyup.enter.prevent="sendAuthorMessage()"
        messages="AI-generated content may be incorrect"
      ><template v-slot:loader>
        <v-progress-linear v-if="thinking" indeterminate></v-progress-linear>
      </template></v-textarea>
      <v-btn color="primary" @click="sendAuthorMessage()">Send</v-btn>
    </v-card-actions>
  </v-card>
</template>  
    
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Message } from "../types/chat-types";
import { marked } from "marked";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";

@Component
export default class Chat extends Vue {
  newMessage = "";
  public messages: Message[] = [];
  public thinking: boolean = false;
  suggestions: string[] = [
    "Do you have any recommendations for this expression?",
    "What would happen if some of the properties were missing?",
    "What if there were multiple values returned in any collections?",
    "remove the trace",
    "create a new expression to read a patient's MRN identifier",
    "create a new expression to read a patient's name",

  ];

  public setThinking(thinking: boolean) {
    this.thinking = thinking;
  }

  sendAuthorMessage(text?: string) {
    const messageText = text || this.newMessage.trim();
    this.newMessage = "";
    this.$emit("send-message", messageText);
    this.scrollToBottom();
  }

  resetConversation() {
    this.messages = [];
    this.$emit("reset-conversation");
  }

  applySuggestion(event : MouseEvent & {target: HTMLElement}) {
    if (event.target?.className === "language-fhirpath") {
      console.log('Suggestion applied', event.target?.innerText);
      // Your logic to apply the suggestion
      this.$emit("apply-suggested-expression", event.target?.innerText);
    } else {
      console.log('Context suggestion applied', event.target?.innerText);
      // Your logic to apply the suggestion
      this.$emit("apply-suggested-context", event.target?.innerText);
    }
  }

  /** Convert the parameter data into a HTML from markdown format */
  convertHtml(field: string | undefined): string {
    if (!field) return "";
    return marked(field);
  }

  getConversation(): string {
    const conversationHistory = this.messages
      .map((message) => `${message.user}: ${message.text}`)
      .join("\n");
    return conversationHistory;
  }

  
    getConversationChat(): Array<ChatCompletionRequestMessage> {
    const conversationHistory = this.messages
      .map((message) => { return {"role": this.mapUserName(message.user), "content":  message.text };});
    return conversationHistory;
  }

  mapUserName(role: string): ChatCompletionRequestMessageRoleEnum
  {
    if (role === "Author") return "user";
    if (role === "System") return "system";
    return "assistant";
  }

  public addMessage(user: string, text: string, visible: boolean): void {
    const messageUser = user;
    const messageText = text || this.newMessage.trim();

    if (messageText) {
      const message: Message = { "user": messageUser, "text": messageText, visible: visible };
       this.messages.push(message);
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.$nextTick(() => {
      const container = this.$refs.messagesContainer as HTMLElement;
      container.scrollTop = container.scrollHeight;
    });
  }
}
</script>  
  
<style >

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}

.language-fhirpath,
.language-fhircontext {  
  position: relative;  
}  
  
.language-fhirpath::after,
.language-fhircontext::after {  
  content: 'output';
  font-family: 'Material Icons';
  font-size: medium;
  position: absolute;  
  right: -20px; /* Adjust this value to position the indicator as needed */  
  cursor: pointer;  
  pointer-events:auto;
} 

.message pre code {
  white-space: pre-wrap;
}

</style>

<style scoped>

.messages {
  max-height: calc(100vh - 424px);
  overflow-y: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
}

.suggestions .message {
  font-style: italic;
  cursor: pointer;
}

.suggestions .message:hover {
  font-style: normal;
  background-color: #D2F5FF;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.message-left {
  background-color: #f0f4ff;
  border: 1px solid #1976d2;
  margin-right: 30%;
  border-radius: 8px;
  border-top-left-radius: 0;
}

.message-left .message-user {
  font-weight: bold;
  color: #1976d2;
}

.message-right {
  background-color: #f0f0ff;
  border: 1px solid #9c27b0;
  margin-left: 30%;
  border-radius: 8px;
  border-top-right-radius: 0;
}

.message-right .message-content {
  text-align: left;
}

.message-right .message-user {
  font-weight: bold;
  color: #9c27b0;
}
.user-icon {
  margin-right: 0.5em;
}
</style>  
  