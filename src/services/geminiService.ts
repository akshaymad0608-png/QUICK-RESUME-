const AI_TIMEOUT_MS = 45000;

/** POST to the AI endpoint with a timeout and a guaranteed-string response. */
const askAI = async (prompt: string): Promise<string> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });
    let data: { text?: string; error?: string } = {};
    try { data = await res.json(); } catch { /* non-JSON error body */ }
    if (!res.ok) throw new Error(data.error || `AI request failed (${res.status})`);
    if (typeof data.text !== 'string' || !data.text.trim()) {
      throw new Error('AI returned an empty response. Please try again.');
    }
    return data.text;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('AI request timed out. Please try again.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
};

export const enhanceBulletPoints = async (bullets: string[], action: 'improve' | 'numbers' | 'shorten' | 'expand' | 'grammar' = 'improve'): Promise<string[]> => {
  let promptAction = "Rewrite each bullet point to be more impactful, using strong action verbs, removing fluff, and making them results-oriented.";
  if (action === 'numbers') promptAction = "Add plausible placeholder numbers/metrics (e.g., 'by X%') to these bullets to make them results-oriented.";
  if (action === 'shorten') promptAction = "Shorten each bullet point to be extremely concise and punchy without losing key meaning.";
  if (action === 'expand') promptAction = "Expand each bullet point to add more detail, technologies used, and business value.";
  if (action === 'grammar') promptAction = "Fix any grammar or spelling mistakes in these bullet points. Do not change the meaning.";

  const prompt = `You are an expert resume writer. I will provide a list of bullet points for a resume experience section. ${promptAction}
Return ONLY the improved bullet points separated by newlines, do not include any prefixes or introductory text.

Bullet points:
${bullets.map(b => `- ${b}`).join('\n')}`;

  try {
    const text = await askAI(prompt);
    return text.trim().split('\n').map((b: string) => b.replace(/^[•*-]\s*/, '').trim()).filter(Boolean);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to enhance bullet points.');
  }
};

export const calculateATS = async (resumeData: unknown): Promise<{ score: number, tips: string[] }> => {
  const prompt = `You are an expert ATS (Applicant Tracking System) software simulator and technical recruiter. 
Analyze the provided resume data and give it an ATS match score (from 0 to 100) based on overall structure, keyword richness, action verbs, and completeness.
Also provide 3 specific tips to improve the score.
Respond ONLY with a valid JSON block containing:
- score (number)
- tips (array of strings)
Do not include \`\`\`json or any other formatting.

Resume Data:
${JSON.stringify(resumeData, null, 2)}`;

  try {
    const raw = await askAI(prompt);
    // Parse the JSON output carefully (sometimes gemini wraps it in ```json)
    const text = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate ATS score.');
  }
};

export const suggestSkills = async (jobTitles: string[]): Promise<string[]> => {
  const skillMap: Record<string, string[]> = {
    engineer: ['Problem Solving','System Design','Code Review','Git','Agile','REST APIs','Debugging','Unit Testing','CI/CD'],
    developer: ['JavaScript','TypeScript','React','Node.js','Git','REST APIs','Agile','Docker'],
    manager: ['Team Leadership','Project Management','Stakeholder Communication','Budgeting','Risk Management','Agile','Strategic Planning'],
    designer: ['Figma','Adobe XD','UI/UX Design','Wireframing','Prototyping','User Research','Design Systems'],
    analyst: ['Data Analysis','Excel','SQL','Power BI','Reporting','Critical Thinking','Data Visualization'],
    marketing: ['SEO','Content Strategy','Google Analytics','Social Media','Email Marketing','Copywriting'],
    sales: ['CRM','Lead Generation','Negotiation','Customer Relations','Salesforce','Cold Outreach'],
    accountant: ['Financial Reporting','Tax Compliance','Excel','Tally','Auditing','Bookkeeping','GST'],
    mechanical: ['AutoCAD','SolidWorks','Manufacturing Processes','Quality Control','Production Planning','Lean Manufacturing'],
    default: ['Communication','Teamwork','Time Management','Microsoft Office','Problem Solving','Adaptability'],
  };
  const allSkills = new Set<string>();
  jobTitles.forEach(title => {
    const lower = title.toLowerCase();
    Object.entries(skillMap).forEach(([key, skills]) => {
      if (lower.includes(key)) skills.forEach(s => allSkills.add(s));
    });
  });
  if (allSkills.size === 0) skillMap.default.forEach(s => allSkills.add(s));
  return Array.from(allSkills).slice(0, 12);
};

export const generateSummary = async (resumeData: unknown): Promise<string> => {
  const prompt = `You are an expert resume writer. Write a professional, highly impactful resume summary based on the following resume data. 
It should be concise (3-4 sentences), highlight top skills, and demonstrate value. Do not include introductory text, just the summary paragraph itself.

Resume Data:
${JSON.stringify(resumeData, null, 2)}`;

  try {
    const text = await askAI(prompt);
    return text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate summary.');
  }
};

export const analyzeResume = async (resumeData: unknown): Promise<string> => {
  const prompt = `You are an expert resume reviewer and recruiter. Analyze the following resume data and provide 3-5 concise, actionable bullet points on how to improve this specific resume. Focus on missing keywords, weak verbs, length, missing numbers, or potential gaps. Be direct and helpful.
Do not include any <think> tags or reasoning. Write the output as a clean markdown list.

Resume Data:
${JSON.stringify(resumeData, null, 2)}
  `;

  try {
    const text = await askAI(prompt);
    return text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to analyze resume.');
  }
};

export const generateCoverLetter = async (resumeData: unknown, jobDescription: string): Promise<string> => {
  const prompt = `Write a professional cover letter based on this resume and job description.
Do not include any <think> tags or reasoning. Write the output as a professional letter.

Job Description:
${jobDescription}

Resume Summary:
${JSON.stringify(resumeData, null, 2)}
  `;

  try {
    const text = await askAI(prompt);
    return text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate cover letter.');
  }
};

export const chatWithAI = async (messages: { role: string, content: string }[], resumeData: unknown): Promise<string> => {
  const formattedMessages = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
  const prompt = `You are a helpful and expert AI resume assistant. Help the user build and improve their resume. Be concise and practical. 
Here is their current resume data (for context):
${JSON.stringify(resumeData, null, 2)}

Chat History:
${formattedMessages}
Assistant:`;

  try {
    const text = await askAI(prompt);
    return text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to chat with AI.');
  }
};

export const optimizeWorkExperience = async <T,>(experiences: T[]): Promise<T[]> => {
  const prompt = `You are an expert resume writer. I will provide a JSON array of work experiences.
Rewrite the description bullet points for each experience to be highly professional, impactful, and results-oriented.
Use strong action verbs, remove fluff, and ensure they sound impressive. Keep the newline formatting. Add missing metrics where appropriate with placeholders like [Number]%.

Respond ONLY with a valid JSON array of the same length and structure as the input, with the "description" fields updated.
Do not include any \`\`\`json or other formatting.

Input Work Experiences:
${JSON.stringify(experiences, null, 2)}`;

  try {
    const raw = await askAI(prompt);
    const text = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to optimize work experience.');
  }
};



/* ── Section-by-section resume feedback (used by AI Improvements panel) ── */
export interface ResumeSuggestion {
  title: string;
  detail: string;
  priority: 'high' | 'medium' | 'low';
  quickFix?: string;
  fixTarget?: 'summary';
}

export interface ResumeSectionResult {
  section: string;
  score: number;
  suggestions: ResumeSuggestion[];
}

export interface ResumeSuggestions {
  overallScore: number;
  sections: ResumeSectionResult[];
}

/** Strip markdown fences and parse the model's JSON safely. */
const parseAIJson = <T,>(raw: string): T => {
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('AI returned an unexpected format. Please try again.');
  return JSON.parse(cleaned.slice(start, end + 1)) as T;
};

export const getResumeSuggestions = async (resumeData: unknown): Promise<ResumeSuggestions> => {
  const prompt = `You are an expert resume reviewer. Analyze this resume section by section (Summary, Experience, Education, Skills) and respond ONLY with JSON, no markdown fences, in exactly this shape:
{
  "overallScore": <0-100>,
  "sections": [
    {
      "section": "<Section name>",
      "score": <0-100>,
      "suggestions": [
        { "title": "<short title>", "detail": "<1-2 sentence actionable tip>", "priority": "high" | "medium" | "low", "quickFix": "<optional replacement text>", "fixTarget": "summary" }
      ]
    }
  ]
}
Only include "quickFix" and "fixTarget" for the Summary section when you can propose a full improved summary. Keep suggestions specific to this resume.

Resume data:
${JSON.stringify(resumeData)}`;

  try {
    const text = await askAI(prompt);
    const parsed = parseAIJson<ResumeSuggestions>(text);
    if (typeof parsed.overallScore !== 'number' || !Array.isArray(parsed.sections)) {
      throw new Error('AI returned an unexpected format. Please try again.');
    }
    return parsed;
  } catch (error) {
    console.error(error);
    throw error instanceof Error ? error : new Error('Failed to analyze resume.');
  }
};
