import { useState } from 'react';
import { ResumeData } from '../types';
import { GoogleGenAI } from "@google/genai";

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAI = async (prompt: string, systemPrompt: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key is missing. Please ensure GEMINI_API_KEY is available in your environment.");
      }

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      if (!response.text) {
        throw new Error("Empty response from AI");
      }

      return response.text;
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const enhanceSummaryWithAI = async (currentSummary: string): Promise<string> => {
    const system = "You are an expert resume writer. Enhance the following professional summary to be more impactful, concise, and ATS-friendly. Return ONLY the new summary text. Do not include any conversational filler like 'Here is the enhanced summary'.";
    return callAI(currentSummary, system);
  };

  const enhanceExperienceWithAI = async (responsibilities: string): Promise<string> => {
    const system = "You are an expert resume writer. Enhance the following job responsibilities. Make them bullet points using strong action verbs and highlighting achievements and metrics where possible. Return ONLY the formatted bullet points. Do not include conversational filler.";
    return callAI(responsibilities, system);
  };

  const generateFullResume = async (prompt: string): Promise<ResumeData> => {
     const system = `You are an expert technical recruiter and resume writer. Generate a complete, highly professional resume based on the following input (which could be a job title, arbitrary text, or a LinkedIn dump).
     
Return ONLY a strictly valid JSON object matching this exact structure:
{
  "name": "Full Name",
  "title": "Job Title",
  "email": "email",
  "phone": "phone",
  "location": "City, State",
  "linkedin": "linkedin url",
  "website": "portfolio url",
  "summary": "Strong professional summary...",
  "experience": [
    { "id": "1", "jobTitle": "...", "company": "...", "location": "...", "startDate": "...", "endDate": "...", "responsibilities": "- Task 1\\n- Task 2\\n- Task 3" }
  ],
  "education": [
    { "id": "1", "degree": "...", "institution": "...", "year": "..." }
  ],
  "projects": [
    { "id": "1", "name": "...", "description": "...", "link": "..." }
  ],
  "certifications": [
    { "id": "1", "name": "...", "issuer": "...", "year": "..." }
  ],
  "skills": "Skill1, Skill2, Skill3..."
}

CRITICAL: Return ONLY valid JSON, starting with { and ending with }. No markdown blocks, no conversational text. Use \\n for newlines in responsibilities. Invent highly realistic and impressive bullet points and data if the input is vague.`;

     const textStr = await callAI(prompt, system);
     try {
        const parsed = JSON.parse(textStr.trim()) as ResumeData;
        // ensure IDs are unique just in case
        parsed.experience = parsed.experience?.map(e => ({...e, id: crypto.randomUUID()})) || [];
        parsed.education = parsed.education?.map(e => ({...e, id: crypto.randomUUID()})) || [];
        parsed.projects = parsed.projects?.map(e => ({...e, id: crypto.randomUUID()})) || [];
        parsed.certifications = parsed.certifications?.map(e => ({...e, id: crypto.randomUUID()})) || [];
        return parsed;
     } catch(e) {
        throw new Error("Failed to parse AI response. Please try again.");
     }
  };

  const generateAISkills = async (role: string, summary: string): Promise<string> => {
     const system = "You are a career expert. Suggest 10 highly relevant skills (both hard and soft) for the following role and summary. Return ONLY a comma-separated list of skills, nothing else.";
     return callAI(`Role: ${role}\nSummary: ${summary}`, system);
  };

  const generateInterviewPrep = async (resumeDataStr: string): Promise<string> => {
     const system = "You are an expert technical interviewer. Based on the provided resume JSON, generate a customized interview prep guide. Include 5 highly specific behavioral questions, 5 technical/domain-specific questions, and suggestions to improve their narrative. Output clean, readable text with headers and bullet points.";
     return callAI(resumeDataStr, system);
  };

  const generateCoverLetter = async (resumeDataStr: string): Promise<string> => {
     const system = "You are an expert career coach. Based on the provided resume JSON, write a compelling, modern, and professional cover letter. It should highlight the candidate's core strengths and most impressive achievements. Output ONLY the body of the cover letter (do not include the header/contact blocks, as those are handled by the UI). Keep it under 400 words.";
     return callAI(resumeDataStr, system);
  };

  return {
    isLoading,
    error,
    enhanceSummaryWithAI,
    enhanceExperienceWithAI,
    generateFullResume,
    generateAISkills,
    generateInterviewPrep,
    generateCoverLetter
  };
};
