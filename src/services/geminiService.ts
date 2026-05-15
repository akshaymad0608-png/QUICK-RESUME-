const actionVerbs = ['Led','Built','Developed','Managed','Designed','Improved','Delivered','Implemented','Increased','Reduced','Launched','Streamlined','Optimized','Coordinated','Achieved','Drove','Spearheaded','Established','Executed','Oversaw'];

export const enhanceBulletPoints = async (bullets: string[]): Promise<string[]> => {
  return bullets.map(bullet => {
    const clean = bullet.replace(/^[•\-*]\s*/, '').trim();
    if (!clean) return clean;
    const firstWord = clean.split(' ')[0];
    const alreadyStrong = actionVerbs.some(v => firstWord.toLowerCase() === v.toLowerCase());
    if (alreadyStrong) return clean;
    const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    return `${verb} ${clean.charAt(0).toLowerCase()}${clean.slice(1)}`;
  });
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

export const generateSummary = async (resumeData: { personalInfo: Record<string, string>, experience: Record<string, string>[], skills: string[] }): Promise<string> => {
  const { personalInfo, experience, skills } = resumeData;
  const name = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
  const title = personalInfo.jobTitle || 'professional';
  const years = experience.length > 1 ? `${experience.length * 2}+ years of` : 'solid';
  const topSkills = skills.slice(0, 3).join(', ') || 'delivering quality results';
  const company = experience[0]?.company || '';
  return `${name ? name + ' is a' : 'A'} results-driven ${title} with ${years} experience in ${topSkills}. ${company ? `Previously at ${company}, demonstrating` : 'Known for demonstrating'} strong analytical and problem-solving abilities. Skilled at collaborating with cross-functional teams to deliver impactful outcomes and drive continuous improvement.`;
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

