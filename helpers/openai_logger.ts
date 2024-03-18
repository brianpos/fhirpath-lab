import { Message } from "../types/chat-types";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AxiosError } from "axios";

export async function LogConversation(
  user_name: string,
  feature: string,
  sentiment: string,
  comments: string | undefined,
  messages: Array<Message>,
  log_server: string
): Promise<string | undefined> {
  try {
    // Log the conversation to the server
    let data : FhirPathAILogEntry = {
      user_name: user_name,
      feature: feature,
      sentiment: sentiment,
      messages: messages,
    };
    if (comments) {
      data.comments = comments;
    }
    let urlRequest = `${log_server}/ai_chat_log`;
    console.log(data);
    let response = await axios.post(urlRequest, data);
    console.log("conversation logged to " + log_server);
  } catch (err: any) {
    console.log(err);
    return err.message ?? err.error?.message;
  }
}

interface FhirPathAILogEntry {
  user_name: string;
  feature: string;
  sentiment: string;
  comments?: string;
  messages: Message[];
}

