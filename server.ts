import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import multer from 'multer';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

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
      } else if (req.file.originalname.endsWith('.docx') || req.file.mimetype.includes('wordprocessingml')) {
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        text = result.value;
      } else {
        text = req.file.buffer.toString('utf-8');
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Invalid or missing GEMINI_API_KEY. Please provide a real Google Gemini API key in the AI Studio Settings." });
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
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const resultText = response.text;
      if (!resultText) throw new Error("Empty response from AI");
      
      let textToParse = resultText.trim();
      textToParse = textToParse.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

      const resultObj = JSON.parse(textToParse);

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
  app.get('/sitemap.xml', (req, res) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://quickresume.business/</loc>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://quickresume.business/resources</loc>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://quickresume.business/examples</loc>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://quickresume.business/cover-letter</loc>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://quickresume.business/choose-template</loc>
    <changefreq>weekly</changefreq>
  </url>
</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Robots.txt
  app.get('/robots.txt', (req, res) => {
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
