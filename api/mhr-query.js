export default function handler(req, res) {
  const q = (req.query.q || "").toLowerCase();

  let result = "No matching information found in My Health Record.";

  if (q.includes("ct") || q.includes("scan") || q.includes("imaging")) {
    result = "CT of the head, neck and abdomen was performed in 2024.";
  } 
  else if (q.includes("vaccine") || q.includes("immunisation") || q.includes("immunization")) {
    result = "Typhoid vaccine administered in 2020.";
  } 
  else if (q.includes("medication") || q.includes("medications") || q.includes("drug")) {
    result = "Current medication includes Paroxetine 200mg.";
  } 
  else if (q.includes("pathology") || q.includes("blood") || q.includes("neutropenia")) {
    result = "Mild neutropenia recorded in March 2025.";
  } 
  else if (q.includes("allergy") || q.includes("allergic")) {
    result = "Penicillin allergy documented.";
  }

  res.status(200).json({ result });
}
