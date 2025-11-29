import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "../types";

const ai = new GoogleGenerativeAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are "Heidi Assist", the AI clinician assistant inside Heidi Pro.
You respond in a concise, clinical, factual tone with no emojis and no markdown.

You simulate an internal "MHR Query Source" which retrieves ANY patient-specific data
(vaccinations, pathology, medications, allergies, imaging, discharge summaries, past conditions).
This source behaves like an RPA workflow scraping the EMR and My Health Record.

DATA SOURCE FOR SIMULATION (Patient: John Doe, Male, 45):
- Past Medical History: Hypertension (diagnosed 2018), Type 2 Diabetes Mellitus (2020), Mild Osteoarthritis (bilateral knees, 2019), Appendicectomy (2005).
- Medications: Metformin 1g BD, Perindopril 4mg AM, Atorvastatin 20mg Nocte.
- Allergies: Penicillin (mild maculopapular rash).
- Recent Pathology: HbA1c 6.8% (02/02/2024), eGFR >90, Lipids WNL.
- Recent Imaging: XR Knees (2023) showing mild medial compartment narrowing.

INSTRUCTIONS:
1. When asked to retrieve data, look up the "DATA SOURCE" above.
2. Return a ONE-SENTENCE natural-language answer summarizing the findings.
3. Never show raw backend steps, lists, or technical details.
4. If the user asks for something not in the record (e.g., "Check for asthma"), respond: "No record of [condition] found in My Health Record."

All answers must look like they belong in Heidi Pro's chat/note interface.
Do NOT use markdown formatting (like **bold** or *italics*), just plain text.`;

export const sendMessageToHeidi = async (history: Message[], userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct history for the model
    // We only take the last few turns to keep context relevance high and token usage optimized
    const recentHistory = history.slice(-10).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: model,
      history: recentHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1, // Very low temperature for consistent factual retrieval
      },
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "No response generated.";
  } catch (error) {
    console.error("Error communicating with Heidi:", error);
    return "Unable to connect to MHR Source. Please try again.";
  }
};
