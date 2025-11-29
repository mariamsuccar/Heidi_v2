import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req.query;
  const { sessionId } = req.query;

  // Generate JWT required by Heidi API
  const token = jwt.sign(
    {
      email: "demo@example.com",
      id: Math.floor(Math.random() * 1000000)
    },
    process.env.HEIDI_SHARED_SECRET, 
    { expiresIn: "10m" }
  );

  // Fetch data from Heidi session
  const h = await fetch(
    `https://api.heidihealth.com/sessions/${sessionId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const sessionData = await h.json();

  res.status(200).json({
    query,
    sessionData
  });
}
