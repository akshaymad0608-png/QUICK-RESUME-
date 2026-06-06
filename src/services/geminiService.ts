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
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate');
    return data.text.trim().split('\n').map((b: string) => b.replace(/^[•*-]\s*/, '').trim()).filter(Boolean);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to enhance bullet points.');
  }
};

export const calculateATS = async (resumeData: Record<string, unknown>): Promise<{ score: number, tips: string[] }> => {
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
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate');
    
    // Parse the JSON output carefully (sometimes gemini wraps it in ```json)
    let text = data.text.trim();
    if (text.startsWith('```json')) text = text.replace('```json', '').replace('```', '').trim();
    if (text.startsWith('```')) text = text.replace('```', '').replace('```', '').trim();

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

export const generateSummary = async (resumeData: Record<string, unknown>): Promise<string> => {
  const prompt = `You are an expert resume writer. Write a professional, highly impactful resume summary based on the following resume data. 
It should be concise (3-4 sentences), highlight top skills, and demonstrate value. Do not include introductory text, just the summary paragraph itself.

Resume Data:
${JSON.stringify(resumeData, null, 2)}`;

  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate');
    return data.text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate summary.');
  }
};

export const analyzeResume = async (resumeData: Record<string, unknown>): Promise<string> => {
  const prompt = `You are an expert resume reviewer and recruiter. Analyze the following resume data and provide 3-5 concise, actionable bullet points on how to improve this specific resume. Focus on missing keywords, weak verbs, length, missing numbers, or potential gaps. Be direct and helpful.
Do not include any <think> tags or reasoning. Write the output as a clean markdown list.

Resume Data:
${JSON.stringify(resumeData, null, 2)}
  `;

  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate');
    return data.text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to analyze resume.');
  }
};

export const generateCoverLetter = async (resumeData: Record<string, unknown>, jobDescription: string): Promise<string> => {
  const prompt = `Write a professional cover letter based on this resume and job description.
Do not include any <think> tags or reasoning. Write the output as a professional letter.

Job Description:
${jobDescription}

Resume Summary:
${JSON.stringify(resumeData, null, 2)}
  `;

  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate');
    return data.text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate cover letter.');
  }
};

export const chatWithAI = async (messages: { role: string, content: string }[], resumeData: Record<string, unknown>): Promise<string> => {
  const formattedMessages = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
  const prompt = `You are a helpful and expert AI resume assistant. Help the user build and improve their resume. Be concise and practical. 
Here is their current resume data (for context):
${JSON.stringify(resumeData, null, 2)}

Chat History:
${formattedMessages}
Assistant:`;

  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate');
    return data.text.trim();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to chat with AI.');
  }
};


