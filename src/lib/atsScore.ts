import { ResumeData } from '../types';

const ACTION_VERBS = [
  'managed', 'led', 'developed', 'created', 'designed', 'improved', 'increased', 
  'reduced', 'saved', 'launched', 'implemented', 'orchestrated', 'spearheaded',
  'architected', 'built', 'optimized', 'scaled', 'mentored', 'negotiated'
];

export const calculateATSScore = (data: ResumeData): number => {
  let score = 0;
  let maxScore = 100;
  
  // 1. Core Fields (30 points)
  if (data.name && data.name.length > 2) score += 5;
  if (data.email && data.email.includes('@')) score += 5;
  if (data.phone && data.phone.length > 7) score += 5;
  if (data.location) score += 5;
  if (data.linkedin && data.linkedin.includes('linkedin.com')) score += 5;
  if (data.summary && data.summary.length > 50) score += 5;

  // 2. Experience Quality (40 points max)
  if (data.experience && data.experience.length > 0) {
     score += 10; // Having at least one job
     
     let allBulletsHaveVerbs = true;
     let hasQuantifiableMetrics = false;

     data.experience.forEach(exp => {
        if (!exp.responsibilities) {
           allBulletsHaveVerbs = false;
           return;
        }

        const lowerResp = exp.responsibilities.toLowerCase();
        
        // Check for numbers/metrics (%, $, or raw numbers)
        if (/\d+%|\$\d+|\d+x|\d+\s*(million|k|thousand)/i.test(lowerResp)) {
           hasQuantifiableMetrics = true;
        }

        const hasVerb = ACTION_VERBS.some(verb => lowerResp.includes(verb));
        if (!hasVerb) allBulletsHaveVerbs = false;
     });

     if (allBulletsHaveVerbs) score += 15;
     if (hasQuantifiableMetrics) score += 15;
  }

  // 3. Skills (15 points)
  if (data.skills && data.skills.length > 0) {
      const skillCount = data.skills.split(',').length;
      if (skillCount >= 5) score += 15;
      else if (skillCount >= 1) score += 5;
  }

  // 4. Education (5 points)
  if (data.education && data.education.length > 0) {
      score += 5;
  }

  // 5. Projects or Certifications (10 points)
  if ((data.projects && data.projects.length > 0) || (data.certifications && data.certifications.length > 0)) {
     score += 10;
  }

  return Math.min(score, maxScore);
};

export const getScoreLabel = (score: number) => {
   if (score >= 90) return 'Excellent';
   if (score >= 70) return 'Good';
   if (score >= 50) return 'Fair';
   return 'Poor';
};

export const getScoreColor = (score: number) => {
   if (score >= 90) return 'text-emerald-400';
   if (score >= 70) return 'text-cyan-400';
   if (score >= 50) return 'text-amber-400';
   return 'text-rose-400';
};
