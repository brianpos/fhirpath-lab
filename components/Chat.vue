<template>
  <v-card style="display:flex; flex-direction: column; align-items: stretch;">
    <v-card-text style="overflow-y: auto; flex-grow: 5;">
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
          <v-scroll-x-transition mode="out-in" :appear="true">
            <div :class="[
              'message',
              message.user === 'Author'
                ? 'message-right'
                : 'message-left',
            ]" v-show="message.visible">
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
                <span class="message-user">{{ message.user }}</span>: <span style="pointer-events: none;"
                  @click="applySuggestion" v-html="convertHtml(message.text)" />
              </div>
              <div v-if="message.user !== 'Author'" class="ai-chat-logging">
                <v-btn v-if="openAIFeedbackEnabled === true" x-small icon @click="logHappy(index)" title="Like"><v-icon>mdi-thumb-up-outline</v-icon></v-btn>
                <v-btn v-if="openAIFeedbackEnabled" x-small icon @click="logSad(index)" title="Dislike"><v-icon>mdi-thumb-down-outline</v-icon></v-btn>
                <v-btn x-small icon @click="shareViaClipboard(index)" title="Copy Conversation to clipboard"><v-icon>mdi-share-variant-outline</v-icon></v-btn>
              </div>
            </div>
          </v-scroll-x-transition>
        </div>
      </div>
      <div class="messages suggestions" v-if="messages.length == 0">
        <div v-for="(message, index) in suggestionsWhenEmpty" :key="index">
          <v-scroll-x-transition mode="out-in" :appear="true">
            <div class="message message-right" @click="sendAuthorMessage(message)">
              <div class="message-content">
                <template v-if="index==0">
                  <img alt="" style="width: 32px; height: 32px; margin-top: -6px; margin-right: -6px; display:inline;" src="/Square44x44Logo.scale-150.png"/>
                  <span class="message-user">suggestions</span>:
                </template>
                <span v-html="convertHtml(message)" />
              </div>
            </div>
          </v-scroll-x-transition>
        </div>
      </div>
      <div class="messages suggestions">
        <div v-for="(message, index) in suggestions" :key="index">
          <v-scroll-x-transition mode="out-in" :appear="true">
            <div class="message message-right" @click="sendAuthorMessage(message); removeSuggestion(message)">
              <div class="message-content">
                <template v-if="messages.length > 0">
                <img alt="" style="width: 32px; height: 32px; margin-top: -6px; margin-right: -6px; display:inline;" src="/Square44x44Logo.scale-150.png"/>
                <span class="message-user">suggestion</span>:</template> <span v-html="convertHtml(message)" />
              </div>
              <div class="ai-chat-logging" style="position: absolute; right: 6px; top: 6px;">
                <v-btn x-small icon @click.stop="removeSuggestion(message)" title="Ignore suggestion"><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </div>
          </v-scroll-x-transition>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="resetConversation"><v-icon>mdi-broom</v-icon></v-btn>
        </template>
        <span>Reset chat</span>
      </v-tooltip>
      <v-textarea dense label="Message" rows="2" v-model="newMessage" clearable :loading="thinking"
        @keyup.enter.prevent="sendAuthorMessage()" messages="AI-generated content may be incorrect"><template
          v-slot:loader>
          <v-progress-linear v-if="thinking" indeterminate></v-progress-linear>
        </template></v-textarea>
      <v-btn color="primary" @click="sendAuthorMessage()">Send</v-btn>
    </v-card-actions>
  </v-card>
</template>  
    
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Message } from "../types/chat-types";
import { marked } from "marked";
import { ChatMessage } from "@azure/openai";
import { LogConversation } from "../helpers/openai_logger";
import { settings } from "~/helpers/user_settings";

@Component
export default class Chat extends Vue {
  newMessage = "";
  public messages: Message[] = [];
  public thinking: boolean = false;
  @Prop()
  public readonly publisher: string | undefined;
  @Prop()
  public readonly feature?: string;
  @Prop({
    default: () => [
      "Do you have any recommendations for this expression?",
      "What would happen if some of the properties were missing?",
      "What if there were multiple values returned in any collections?",
      "remove the trace",
      "create a new expression to read a patient's MRN identifier",
      "create a new expression to read a patient's name",
    ]
  }) readonly suggestionsWhenEmpty!: string[];
  @Prop({
    default: () => [
    ]
  }) readonly suggestions!: string[];
  @Prop()
  public readonly openAIFeedbackEnabled?: boolean;

  public removeSuggestion(suggestion: string){
    this.$emit("remove-suggestion", suggestion);
    this.scrollToBottom();
  }

  public logHappy(index: number) {
    const messages = this.messages.slice(0, index+1);
    LogConversation(
      settings.getDefaultProviderField()!,
      this.feature ?? 'unknown',
      "like",
      undefined,
      messages,
      settings.dotnet_server_r4b().replace("/$fhirpath","")
    );
  }

  public logSad(index: number) {
    const messages = this.messages.slice(0, index+1);
    LogConversation(
      settings.getDefaultProviderField()!,
      this.feature ?? 'unknown',
      "dislike",
      undefined,
      messages,
      settings.dotnet_server_r4b().replace("/$fhirpath","")
    );
  }

  public shareViaClipboard(index: number) {
    const messages = this.messages.slice(0, index+1);
    const conversationHistory = this.messages
      .map((message) => `**${message.user}:**\n ${message.text}`)
      .join("\n\n").replace('\n\n\n','\n\n');
    const conversation = conversationHistory;
     
    navigator.clipboard.writeText(conversation);
  }

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

  applySuggestion(event: MouseEvent & { target: HTMLElement }) {
    var valueString = event.target?.innerText;
    if (valueString.length > 0) {
      valueString = valueString.trim();
    }
    console.log(event.target?.className + ' applied', valueString);
    if (event.target?.className === "language-fhirpath") {
      this.$emit("apply-suggested-expression", valueString);

    } else if (event.target?.className === "language-fhircontext") {
      this.$emit("apply-suggested-context", valueString);

    } else if (event.target?.className === "language-questionnaire") {
      this.$emit("apply-suggested-questionnaire", valueString);

    } else if (event.target?.className === "language-item") {
      this.$emit("apply-suggested-item", valueString);

    } else if (event.target?.className === "language-fhir") {
      this.$emit("apply-suggested-fhir", valueString);

    } else if (event.target?.className === "language-jsonpatch") {
      this.$emit("apply-suggested-jsonpatch", valueString);

    } else {
      this.$emit("apply-suggested-json", valueString);
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


  getConversationChat(): Array<ChatMessage> {
    const conversationHistory = this.messages
      .map((message) => { return { "role": this.mapUserName(message.user), "content": message.text }; });
    return conversationHistory;
  }

  mapUserName(role: string): string {
    if (role === "Author") return "user";
    if (role === "System") return "system";
    return "assistant";
  }

  public addMessage(user: string, text: string, visible: boolean, model_name?: string): void {
    const messageUser = user;
    const messageText = text || this.newMessage.trim();

    if (messageText) {
      const message: Message = { "user": messageUser, "text": messageText, visible: visible };
      if (model_name) {
        message.model_name = model_name;
      }
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
  
<style lang="scss">
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}

.message pre:has(.language-fhirpath),
.message pre:has(.language-fhircontext),
.message pre:has(.language-questionnaire),
.message pre:has(.language-item),
.message pre:has(.language-fhir),
.message pre:has(.language-log),
.message pre:has(.language-jsonpatch),
.message pre:has(.language-json) {
  position: relative;
  padding: 8px 8px 8px 16px;
  border: solid 1px #ddd;
}

.message pre code {
  padding-left: 0;
}

.language-fhirpath::after,
.language-fhircontext::after,
.language-questionnaire::after,
.language-item::after,
.language-fhir::after,
.language-jsonpatch::after,
.language-json::after {
  content: 'assignment_return';
  font-family: 'Material Icons';
  font-size: x-large;
  color: $card-header-color;
  position: absolute;
  right: 0;
  /* Adjust this value to position the indicator as needed */
  top: 0;
  cursor: pointer;
  pointer-events: auto;
  margin: 8px;
}

.language-fhirpath:hover::after,
.language-fhircontext:hover::after,
.language-questionnaire:hover::after,
.language-item:hover::after,
.language-fhir:hover::after,
.language-jsonpatch:hover::after,
.language-json:hover::after {
  color: #1976d2;
}


.language-item::after,
.language-fhir::after,
.language-json::after {
  content: 'content_copy';
}

.language-fhirpath::before,
.language-fhircontext::before,
.language-questionnaire::before,
.language-item::before,
.language-fhir::before,
.language-log::before,
.language-jsonpatch::before,
.language-json::before {
  font-size: small;
  font-style: italic;
  position: absolute;
  right: 0;
  /* Adjust this value to position the indicator as needed */
  bottom: 0;
  margin: 4px;
  color: #ddd;
}

.language-log::before {
  content: '(log)';
}

.language-fhirpath::before {
  content: '(fhirpath)';
}

.language-fhircontext::before {
  content: '(context)';
}

.language-questionnaire::before {
  content: '(questionnaire)';
}

.language-item::before {
  content: '(item)';
}

.language-fhir::before {
  content: '(fhir)';
}

.language-json::before {
  content: '(json)';
}

.language-jsonpatch::before {
  content: '(patch)';
}

.message pre:has(code) {
  background-color: ghostwhite;
}

.message pre code {
  white-space: pre-wrap;
  background-color: unset !important;
}

div.message-content span p {
  margin-bottom: 8px;
}

div.message-content span :last-child {
  margin-bottom: 0px;
}
</style>

<style scoped lang="scss">
.ai-chat-logging {
  text-align: right;
}

.messages {
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
  background-color: #D2F5FFaa;
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
  position: relative;
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
  