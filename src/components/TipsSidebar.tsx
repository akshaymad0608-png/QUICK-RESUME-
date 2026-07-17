import React from 'react';
import { Lightbulb, X } from 'lucide-react';
import { BuilderSection } from '../pages/Build';

interface TipsSidebarProps {
  section: BuilderSection | null;
  onClose: () => void;
}

const TIPS: Record<string, string[]> = {
  personal: [
    "Include a professional email address.",
    "Add a link to your LinkedIn profile or portfolio.",
    "Make sure your phone number is current and formatted clearly."
  ],
  summary: [
    "Keep it concise: 3-5 sentences maximum.",
    "Highlight your most impressive achievements, not just responsibilities.",
    "Tailor your summary to the specific role you're targeting."
  ],
  experience: [
    "Use strong action verbs (e.g., 'Led', 'Developed', 'Optimized').",
    "Quantify your achievements with numbers and percentages when possible.",
    "Focus on results and impact rather than just listing daily tasks."
  ],
  education: [
    "Include your graduation date (or expected date).",
    "Add relevant coursework if you lack professional experience.",
    "Mention academic honors or high GPA (typically 3.5+)."
  ],
  skills: [
    "Include both hard skills (technical) and soft skills.",
    "Match your skills to the job description keywords.",
    "Group similar skills together for better readability."
  ],
  projects: [
    "Explain what the project was and your specific role.",
    "Highlight the technologies and tools you used.",
    "Provide links to live demos or GitHub repositories if available."
  ],
  certifications: [
    "List the most relevant and recent certifications first.",
    "Include the issuing organization and date earned.",
    "Don't include expired certifications unless still highly relevant."
  ],
  languages: [
    "Specify your proficiency level (e.g., Native, Fluent, Conversational).",
    "Only list languages you can actually use in a professional setting.",
    "Don't list English if it's the only language you speak and it's assumed."
  ]
};

const TipsSidebar: React.FC<TipsSidebarProps> = ({ section, onClose }) => {
  if (!section || !TIPS[section]) return null;

  const tips = TIPS[section];

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm relative mt-4 mb-2 animate-in fade-in slide-in-from-top-2 duration-300">
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-amber-600 hover:text-amber-800 transition-colors"
      >
        <X size={16} />
      </button>
      
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="font-bold text-amber-900 capitalize">{section} Tips</h3>
      </div>
      
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="text-sm text-amber-800 flex gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span className="leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipsSidebar;
