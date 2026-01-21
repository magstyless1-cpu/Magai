
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const sendMessageToGemini = async (
  messages: Message[],
  isThinkingMode: boolean
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Convert history to Gemini format
  const history = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  const lastMessage = history.pop();
  if (!lastMessage) return "No message content found.";

  try {
    const config: any = {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
    };

    if (isThinkingMode) {
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        lastMessage
      ],
      config,
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
      throw new Error("API_KEY_EXPIRED");
    }
    throw error;
  }
};
