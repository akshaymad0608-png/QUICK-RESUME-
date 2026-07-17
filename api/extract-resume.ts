import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import mammoth from 'mammoth';

/**
 * Serverless resume extraction for static (Vercel) deploys.
 * Accepts JSON: { filename, mimeType, data(base64) } — no multipart, so it
 * works identically on serverless and the Express dev server.
 * PDFs go straight to Gemini, which reads them natively (scanned PDFs too).
 */

const SCHEMA_PROMPT = `Extract all relevant resume information into a structured JSON object.
Use the following format. Ensure it follows this exact JSON structure. Respond with ONLY the JSON — no markdown, no commentary:
{
  "personalInfo": {
    "firstName": "", "lastName": "", "jobTitle": "", "email": "", "phone": "",
    "location": "", "city": "", "country": "", "linkedin": "", "portfolio": "",
    "website": "", "address": ""
  },
  "summary": "",
  "experience": [
    { "company": "", "jobTitle": "", "city": "", "country": "", "startDate": "", "endDate": "", "description": "", "isPresent": false }
  ],
  "education": [
    { "schoolName": "", "degree": "", "fieldOfStudy": "", "city": "", "country": "", "startYear": "", "endYear": "", "description": "" }
  ],
  "skills": ["skill1", "skill2"]
}`;

const parseLoose = (raw: string): Record<string, unknown> | null => {
  let t = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  const first = t.indexOf('{');
  if (first === -1) return null;
  const last = t.lastIndexOf('}');
  t = last > first ? t.slice(first, last + 1) : t.slice(first);
  const attempts = [t, t.replace(/,\s*([}\]])/g, '$1')];
  {
    let fixed = attempts[1];
    const quoteCount = (fixed.match(/(?<!\\)"/g) || []).length;
    if (quoteCount % 2 === 1) fixed += '"';
    let opens = 0, closes = 0, oB = 0, cB = 0;
    for (const ch of fixed) {
      if (ch === '{') opens++; else if (ch === '}') closes++;
      else if (ch === '[') oB++; else if (ch === ']') cB++;
    }
    fixed += ']'.repeat(Math.max(0, oB - cB)) + '}'.repeat(Math.max(0, opens - closes));
    attempts.push(fixed);
  }
  for (const a of attempts) {
    try { return JSON.parse(a); } catch { /* try next */ }
  }
  return null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { filename = '', mimeType = '', data = '' } = (req.body || {}) as { filename?: string; mimeType?: string; data?: string };
    if (!data) return res.status(400).json({ error: 'No file uploaded' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "The AI reader isn't configured yet (missing GEMINI_API_KEY on the server)." });
    }

    const buffer = Buffer.from(data, 'base64');
    const lower = filename.toLowerCase();
    const isPdf = mimeType === 'application/pdf' || lower.endsWith('.pdf');
    const isDocx = lower.endsWith('.docx') || mimeType.includes('wordprocessingml');

    const ai = new GoogleGenAI({ apiKey, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });

    // Build request contents: PDFs go to Gemini natively; DOCX/text as text.
    let contents: unknown;
    if (isPdf) {
      contents = [
        { inlineData: { mimeType: 'application/pdf', data } },
        { text: `${SCHEMA_PROMPT}\n\nThe resume is in the attached PDF.` },
      ];
    } else if (isDocx) {
      let text = '';
      try {
        const result = await mammoth.extractRawText({ buffer });
        text = (result.value || '').trim();
      } catch {
        return res.status(422).json({ error: "We couldn't open that Word file. Please re-save it as .docx or export it as a PDF and try again." });
      }
      if (text.length < 40) {
        return res.status(422).json({ error: "That file doesn't seem to contain any readable resume text." });
      }
      contents = `${SCHEMA_PROMPT}\n\nText to extract from:\n${text.slice(0, 16000)}`;
    } else {
      const text = buffer.toString('utf-8').trim();
      if (text.length < 40) {
        return res.status(422).json({ error: 'Please upload your resume as a PDF or DOCX.' });
      }
      contents = `${SCHEMA_PROMPT}\n\nText to extract from:\n${text.slice(0, 16000)}`;
    }

    const models = [process.env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-2.0-flash'].filter(Boolean) as string[];
    let resultText = '';
    let lastErr: unknown = null;
    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: contents as Parameters<typeof ai.models.generateContent>[0]['contents'],
          config: { responseMimeType: 'application/json', maxOutputTokens: 8192 },
        });
        resultText = response.text || '';
        if (resultText) break;
      } catch (e) { lastErr = e; }
    }
    if (!resultText) {
      console.error('All models failed:', lastErr);
      return res.status(502).json({ error: 'The AI reader is temporarily unavailable. Please try again in a minute.' });
    }

    const parsed = parseLoose(resultText);
    if (!parsed) {
      console.error('Unparseable AI output:', resultText.slice(0, 500));
      return res.status(502).json({ error: "We couldn't read the details from that file. Please try uploading it once more." });
    }

    const p = (parsed.personalInfo || {}) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === 'string' ? v : '');
    const arr = (v: unknown) => (Array.isArray(v) ? v : []);
    const resultObj = {
      personalInfo: {
        firstName: str(p.firstName), lastName: str(p.lastName), jobTitle: str(p.jobTitle),
        email: str(p.email), phone: str(p.phone), location: str(p.location),
        city: str(p.city), country: str(p.country), linkedin: str(p.linkedin),
        portfolio: str(p.portfolio), website: str(p.website), address: str(p.address),
      },
      summary: str(parsed.summary),
      experience: arr(parsed.experience).map((e: Record<string, unknown>) => ({
        company: str(e.company), jobTitle: str(e.jobTitle), city: str(e.city), country: str(e.country),
        startDate: str(e.startDate), endDate: str(e.endDate), description: str(e.description),
        isPresent: Boolean(e.isPresent),
      })),
      education: arr(parsed.education).map((e: Record<string, unknown>) => ({
        schoolName: str(e.schoolName), degree: str(e.degree), fieldOfStudy: str(e.fieldOfStudy),
        city: str(e.city), country: str(e.country), startYear: str(e.startYear),
        endYear: str(e.endYear), description: str(e.description),
      })),
      skills: arr(parsed.skills).filter((x: unknown) => typeof x === 'string'),
    };

    const foundSomething = resultObj.personalInfo.firstName || resultObj.summary ||
      resultObj.experience.length || resultObj.education.length || resultObj.skills.length;
    if (!foundSomething) {
      return res.status(422).json({ error: 'No resume details were found in that file. Please check it opens correctly and try again.' });
    }

    return res.status(200).json(resultObj);
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong while reading your resume. Please try again.' });
  }
}
