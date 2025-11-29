import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const filePath = path.join(process.cwd(), "public/mhr-data/patient.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const mhr = JSON.parse(raw);

    const query = (req.query.q as string)?.toLowerCase() || "";

    // --- Immunisation search ---
    for (const imm of mhr.immunisations) {
      if (query.includes("typhoid") || query.includes("vaccine")) {
        return res.status(200).json({
          result: `Typhoid vaccine documented in ${imm.date}.`
        });
      }
    }

    // --- Medication lookup ---
    if (query.includes("medication") || query.includes("medications")) {
      const meds = mhr.medications.map(m => `${m.name} ${m.dose}`).join(", ");
      return res.status(200).json({
        result: `Current medications: ${meds}.`
      });
    }

    // --- Pathology ---
    if (query.includes("neutropenia") || query.includes("blood") || query.includes("cbc")) {
      const p = mhr.pathology[0];
      return res.status(200).json({
        result: `${p.severity} neutropenia recorded ${p.date}.`
      });
    }

    // --- Allergy ---
    if (query.includes("allergy") || query.includes("allergic")) {
      const a = mhr.allergies[0];
      return res.status(200).json({
        result: `${a.substance} allergy recorded.`
      });
    }

    // --- Imaging ---
    if (query.includes("scan") || query.includes("ct") || query.includes("imaging")) {
      const i = mhr.imaging[0];
      return res.status(200).json({
        result: `${i.type} of ${i.region} completed in ${i.date}.`
      });
    }

    // Default
    return res.status(200).json({
      result: "No relevant My Health Record data found."
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ result: "RPA extraction failed." });
  }
}
