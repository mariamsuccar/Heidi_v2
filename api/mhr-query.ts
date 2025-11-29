import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const filePath = path.join(process.cwd(), "public/mock-emr/index.html");
    const html = fs.readFileSync(filePath, "utf-8");

    const $ = cheerio.load(html);

    // Example: find immunisation table
    const typhoidRow = $("table#immunisations tr:contains('Typhoid')");

    const result = typhoidRow.length
      ? "Typhoid vaccine recorded in 2018."
      : "No record of typhoid vaccine found.";

    return res.status(200).json({ result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: "RPA extraction failed." });
  }
}
