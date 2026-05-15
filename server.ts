import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import multer from 'multer';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Extracting Resume Data
  app.post("/api/extract-resume", upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      let text = "";
      if (req.file.mimetype === 'application/pdf') {
        const data = await pdfParse(req.file.buffer);
        text = data.text;
      } else {
        text = req.file.buffer.toString('utf-8');
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Server missing GEMINI_API_KEY" });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `Extract all relevant resume information from the following text into a structured JSON object.
Use the following format. Ensure it follows this exact JSON structure:
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
}

Text to extract from:
${text}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const resultText = response.text;
      if (!resultText) throw new Error("Empty response from AI");
      const resultObj = JSON.parse(resultText);

      res.json(resultObj);
    } catch (err: unknown) {
      console.error(err);
      const error = err instanceof Error ? err : new Error(String(err));
      res.status(500).json({ error: error.message || "Failed to extract resume" });
    }
  });

  // API Route for Gemini
  app.post("/api/gemini", async (req, res) => {
    try {
      const { prompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "Server missing GEMINI_API_KEY" });
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
        model: 'gemini-3-flash-preview',
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Important: Express 5 requires named wildcard parameters like '*all'
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
