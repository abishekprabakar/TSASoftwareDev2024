import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export type ChatRequest = {
  text: string;
  context: string[];
};

export type ChatResponse = {
  text: string;
};

const _chat = httpsCallable<ChatRequest, ChatResponse>(functions, "chat");

/**
 * Chat with the bot.
 * @param text The text to send to the bot.
 * @returns The response from the bot.
 */
export const chat = async (
  text: string,
  context: string[],
): Promise<ChatResponse> => {
  const response = await _chat({ text, context });
  return response.data;
};
