import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

/**
 * Serverless AI proxy — powers every AI feature on static (Vercel) deploys,
 * mirroring the Express /api/gemini route used by the dev server.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt } = (req.body || {}) as { prompt?: string };
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "The AI isn't configured yet (missing GEMINI_API_KEY on the server)." });
    }

    const ai = new GoogleGenAI({ apiKey, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });

    const models = [process.env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-2.0-flash'].filter(Boolean) as string[];
    let text = '';
    let lastErr: unknown = null;
    for (const model of models) {
      try {
        const response = await ai.models.generateContent({ model, contents: prompt });
        text = response.text || '';
        if (text) break;
      } catch (e) { lastErr = e; }
    }
    if (!text) {
      console.error('All models failed:', lastErr);
      return res.status(502).json({ error: 'The AI is temporarily unavailable. Please try again in a minute.' });
    }

    return res.status(200).json({ text });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate content. Please try again.' });
  }
}
