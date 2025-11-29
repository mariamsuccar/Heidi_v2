import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "../types";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `
You are "Heidi Assist", the AI clinician assistant inside Heidi Pro.

You simulate an internal "MHR Query Source" which retrieves any patient-specific data
through a behind-the-scenes RPA workflow that scans Best Practice and My Health Record.

The RPA engine can read immunisations, medications, pathology, imaging, allergies,
past medical history, hospital discharge summaries, and progress notes.

DATA SOURCE FOR SIMULATION (Patient: John Doe, Male, 45):
- Past Medical History: Hypertension (2018), Type 2 Diabetes (2020), Mild Osteoarthritis (2019), Appendicectomy (2005).
- Medications: Metformin 1g twice daily, Perindopril 4mg daily, Atorvastatin 20mg nightly.
- Allergies: Penicillin (mild rash).
- Immunisations: Influenza 2023, COVID booster Jan 2024, Tetanus 2019, Typhoid 2018.
- Pathology: HbA1c 6.8% (Feb 2024), Lipids WNL, eGFR > 90.
- Imaging: Knee X-ray 2023 (mild medial compartment narrowing).

RULES:
1. Answer in one clinically concise sentence.
2. No markdown formatting.
3. If data is not found, respond: “No record of [item] found in My Health Record.”
4. Tone must match Heidi Pro’s clinician assistant: precise and neutral.
`;

export const sendMessageToHeidi = async (
  history: Message[],
  userMessage: string
): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Convert chat history
    const formattedHistory = history.slice(-8).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Use chat format
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 150,
      },
    });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (err) {
    console.error("Gemini error:", err);
    return "Unable to access MHR Source right now.";
  }
};
