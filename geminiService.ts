import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "../types";

const ai = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Trigger phrases that activate the “MHR Query Source”
const MHR_KEYWORDS = [
  "vaccine", "immunisation", "immunization",
  "medication", "medications",
  "pathology", "bloods", "neutropenia",
  "allergy", "allergic",
  "scan", "ct", "imaging", "radiology",
  "mhr", "my health record"
];

function isMhrQuery(text: string): boolean {
  return MHR_KEYWORDS.some(word => text.toLowerCase().includes(word));
}

async function callMhrRpaEngine(question: string): Promise<string> {
  const url = `/api/mhr-query?q=${encodeURIComponent(question)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result;
}

const SYSTEM_INSTRUCTION = `
You are "Heidi Assist", the AI clinician assistant inside Heidi Pro.

You use an internal "MHR Query Source"
which retrieves My Health Record data extracted through a simulated RPA workflow.

You ALWAYS respond in one clinically concise sentence,
plain text, no emojis, no markdown.
`;

export const sendMessageToHeidi = async (
  history: Message[],
  userMessage: string
): Promise<string> => {
  try {
    let rpaResult: string | null = null;

    if (isMhrQuery(userMessage)) {
      rpaResult = await callMhrRpaEngine(userMessage);
    }

    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history.slice(-6).map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 150,
      },
    });

    const finalPrompt = rpaResult
      ? `MHR_QUERY_RESULT: ${rpaResult}\nUser: ${userMessage}`
      : userMessage;

    const response = await chat.sendMessage(finalPrompt);
    return response.response.text();

  } catch (error) {
    console.error("Heidi MHR engine error:", error);
    return "Unable to retrieve My Health Record at this time.";
  }
};
