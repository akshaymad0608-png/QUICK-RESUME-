import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // API Route for Extracting Resume Data
  app.post("/api/extract-resume", async (req, res) => {
    try {
      const { filename = '', mimeType = '', data = '' } = (req.body || {}) as { filename?: string; mimeType?: string; data?: string };
      if (!data) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const fileBuffer = Buffer.from(data, 'base64');

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "The AI reader isn't configured yet (missing GEMINI_API_KEY on the server)." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const isPdf = mimeType === 'application/pdf' || filename.toLowerCase().endsWith('.pdf');
      const isDocx = filename.toLowerCase().endsWith('.docx') || mimeType.includes('wordprocessingml');

      // 1. Get resume content. For PDFs we FIRST try fast local text
      //    extraction, but if pdf-parse fails or the PDF has no text layer
      //    (scanned/image PDFs, exotic encodings), we hand the raw PDF to
      //    Gemini, which reads PDFs natively — so uploads can't dead-end here.
      let text = "";
      let pdfForAI: Buffer | null = null;

      if (isPdf) {
        try {
          const parsed = await pdfParse(fileBuffer);
          text = (parsed.text || '').trim();
        } catch {
          text = '';
        }
        if (text.length < 100) pdfForAI = fileBuffer; // no/low text layer → let Gemini read the PDF itself
      } else if (isDocx) {
        try {
          const result = await mammoth.extractRawText({ buffer: fileBuffer });
          text = (result.value || '').trim();
        } catch {
          return res.status(422).json({ error: "We couldn't open that Word file. Please re-save it as .docx or export it as a PDF and try again." });
        }
      } else {
        text = fileBuffer.toString('utf-8').trim();
      }

      if (!pdfForAI && text.length < 40) {
        return res.status(422).json({ error: "That file doesn't seem to contain any readable resume text. Please upload your resume as a PDF or DOCX." });
      }

      const schemaPrompt = `Extract all relevant resume information into a structured JSON object.
Use the following format. Ensure it follows this exact JSON structure. Respond with ONLY the JSON — no markdown, no commentary:
{
  "personalInfo": {
    "firstName": "", "lastName": "", "jobTitle": "", "email": "", "phone": "",
    "location": "", "city": "", "country": "", "linkedin": "", "portfolio": "",
    "website": "", "address": ""
  },
  "summary": "",
  "experience": [
    {
      "company": "", "jobTitle": "", "city": "", "country": "", "startDate": "",
      "endDate": "", "description": "", "isPresent": false
    }
  ],
  "education": [
    {
      "schoolName": "", "degree": "", "fieldOfStudy": "", "city": "", "country": "",
      "startYear": "", "endYear": "", "description": ""
    }
  ],
  "skills": ["skill1", "skill2"]
}`;

      // 2. Build the request: either extracted text, or the PDF itself.
      const contents = pdfForAI
        ? [
            { inlineData: { mimeType: 'application/pdf', data: pdfForAI.toString('base64') } },
            { text: `${schemaPrompt}\n\nThe resume is in the attached PDF.` },
          ]
        : `${schemaPrompt}\n\nText to extract from:\n${text.slice(0, 16000)}`;

      // 3. Known-good model first, then fallbacks.
      const models = [process.env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-2.0-flash'].filter(Boolean) as string[];
      let resultText = '';
      let lastErr: unknown = null;
      for (const model of models) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
          });
          resultText = response.text || '';
          if (resultText) break;
        } catch (e) { lastErr = e; }
      }
      if (!resultText) {
        console.error('All models failed:', lastErr);
        return res.status(502).json({ error: "The AI reader is temporarily unavailable. Please try again in a minute." });
      }

      // 4. Bulletproof JSON extraction: strip fences, isolate the outermost
      //    object, drop trailing commas, and repair a truncated tail.
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

      const parsed = parseLoose(resultText);
      if (!parsed) {
        console.error('Unparseable AI output:', resultText.slice(0, 500));
        return res.status(502).json({ error: "We couldn't read the details from that file. Please try uploading it once more." });
      }

      // 5. Normalize so the client always gets a complete, predictable shape.
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
        return res.status(422).json({ error: "No resume details were found in that file. Please check it opens correctly and try again." });
      }

      res.json(resultObj);
    } catch (err: unknown) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong while reading your resume. Please try again." });
    }
  });

  // API Route for Gemini
  app.post("/api/gemini", async (req, res) => {
    try {
      const { prompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "Invalid or missing GEMINI_API_KEY. Please provide a real Google Gemini API key in the AI Studio Settings." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
      });

      res.json({ text: response.text });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to generate content" });
    }
  });

  // API Route for Welcome Email
  app.post("/api/send-welcome-email", (req, res) => {
    try {
      const { email, name } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      
      // MOCK sending welcome email
      console.log(`\n\n========================================`);
      console.log(`📧 MOCK EMAIL SENT`);
      console.log(`To: ${email}`);
      console.log(`Subject: Welcome to QuickResume!`);
      console.log(`Body: Hi ${name || 'there'},\nWelcome to QuickResume.business! We're excited to help you build your resume.`);
      console.log(`========================================\n\n`);

      res.json({ success: true, message: "Welcome email sent successfully" });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to send email" });
    }
  });

  const otpStore = new Map<string, string>(); // In-memory store for OTPs

  // API Route to Send OTP
  app.post("/api/send-otp", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
      otpStore.set(email, otp);

      const isPlaceholder = !process.env.SMTP_USER || !process.env.SMTP_PASS || 
        process.env.SMTP_USER === 'your_email@gmail.com' || 
        process.env.SMTP_PASS === 'your_app_password';

      if (!isPlaceholder) {
        try {
          const pass = process.env.SMTP_PASS?.replace(/[\][\s"]/g, '');
          console.log(`[SMTP] Attempting connect with user: ${process.env.SMTP_USER}, pass length: ${pass?.length}`);
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: pass,
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: 'Your QuickResume Login Code',
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
          });

          return res.json({ success: true, message: "OTP sent to your email" });
        } catch (mailError: unknown) {
          const errorMessage = mailError instanceof Error ? mailError.message : String(mailError);
          console.log(`[SMTP INFO] Failed to send real email, falling back to mock. Reason: ${errorMessage}`);
          if (errorMessage.includes('Invalid login') || errorMessage.includes('535-5.7.8')) {
            console.log("[SMTP HINT] Gmail requires an 'App Password'. A regular password won't work.");
            console.log("[SMTP HINT] Go to Google Account -> Security -> 2-Step Verification -> App Passwords to generate one.");
          }
          // proceed to fallback below
        }
      }
      
      // Fallback for development without SMTP credentials or if sending failed
      console.log(`\n\n========================================`);
      console.log(`📧 MOCK OTP EMAIL SENT (SMTP NOT CONFIGURED OR FAILED)`);
      console.log(`To: ${email}`);
      console.log(`Subject: Your QuickResume Login Code`);
      console.log(`Body: Your OTP code is ${otp}. It will expire in 5 minutes.`);
      console.log(`========================================\n\n`);

      res.json({ success: true, message: "Demo OTP created", demoOtp: otp });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Error sending OTP email:", error);
      res.status(500).json({ error: error.message || "Failed to send OTP email" });
    }
  });

  // API Route to Verify OTP
  app.post("/api/verify-otp", (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required" });
      }

      const storedOtp = otpStore.get(email);
      if (storedOtp && storedOtp === otp) {
        otpStore.delete(email); // valid, remove it
        res.json({ success: true, message: "OTP verified successfully", token: "mock-jwt-token" });
      } else {
        res.status(401).json({ error: "Invalid or expired OTP" });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to verify OTP" });
    }
  });


  // Sitemap
  app.get('/sitemap.xml', (_req, res) => {
    const urls = [
      ['/', 'weekly', '1.0'],
      ['/templates', 'weekly', '0.9'],
      ['/improve', 'monthly', '0.8'],
      ['/examples', 'monthly', '0.7'],
      ['/ai-tools', 'monthly', '0.7'],
      ['/cover-letter', 'monthly', '0.6'],
      ['/resources', 'monthly', '0.5'],
      ['/pricing', 'monthly', '0.5'],
    ];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map(([path, freq, pri]) => `  <url><loc>https://quickresume.business${path}</loc><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`).join('\n') +
      `\n</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Robots.txt
  app.get('/robots.txt', (_req, res) => {
    const robots = `User-agent: *
Allow: /

Sitemap: https://quickresume.business/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.send(robots);
  });
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Serve hashed assets and files, but disable directory index + redirect so
    // requests like /templates reach our prerender-aware router below.
    app.use(express.static(distPath, { index: false, redirect: false }));
    // Important: Express 5 requires named wildcard parameters like '*all'
    app.get('*all', (req, res) => {
      const cleanPath = req.path.replace(/^\/+|\/+$/g, '');
      if (cleanPath) {
        const prerendered = path.join(distPath, cleanPath, 'index.html');
        if (fs.existsSync(prerendered)) {
          return res.sendFile(prerendered);
        }
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
