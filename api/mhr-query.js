const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const filePath = path.join(process.cwd(), "public/mhr-data/patient.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  let answer = "No matching My Health Record data found.";

  if (q.includes("vaccine") || q.includes("immunisation") || q.includes("immunization")) {
    answer = `Typhoid vaccine administered in 2020.`;
  } 
  else if (q.includes("medication") || q.includes("medications")) {
    answer = `Current medication: Paroxetine 200mg.`;
  }
  else if (q.includes("neutropenia") || q.includes("pathology") || q.includes("blood")) {
    answer = `Most recent pathology shows mild neutropenia in March 2025.`;
  }
  else if (q.includes("allergy")) {
    answer = `Recorded allergy: Penicillin.`;
  }
  else if (q.includes("scan") || q.includes("ct") || q.includes("imaging")) {
    answer = `Most recent imaging is a head, neck and abdomen CT from 2024.`;
  }

  res.status(200).json({ result: answer });
};
