import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, FileText, CheckCircle2, Download, Star,
  ShieldCheck, Presentation, Settings2, Target, MoveRight, ChevronDown, Check, FileCheck
} from "lucide-react";
import Logo from "./Logo";

interface HomeProps {
  onBuild: () => void;
  onPreviewTemplates?: () => void;
}

const TEMPLATE_PREVIEWS = [
  { name: "ModernPro", type: "sidebar" },
  { name: "Modern", type: "fullwidth" },
  { name: "Minimal", type: "centered" },
  { name: "Tech", type: "darkheader" },
  { name: "Business", type: "fullwidth" },
  { name: "Creative", type: "sidebar" },
];

const TemplateThumbnail = ({ type, name, onBuild }: { type: string, name: string, onBuild: () => void }) => {
  const accent = '#4F46E5';
  return (
    <div className="group cursor-pointer" onClick={() => onBuild()}>
      <div className="aspect-[1/1.414] bg-white rounded-xl overflow-hidden mb-3 border border-gray-200 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#4F46E5]/20 relative">
        
        {type === 'sidebar' && (
          <div className="flex h-full">
            <div className="w-[35%] h-full p-2 flex flex-col gap-2" style={{ backgroundColor: `${accent}08`, borderLeft: `3px solid ${accent}` }}>
               <div>
                 <div className="text-[4px] font-bold mb-0.5" style={{ color: accent }}>SKILLS</div>
                 <div className="flex flex-wrap gap-0.5">
                   {['React', 'Node', 'TypeScript', 'AWS', 'Python', 'GraphQL', 'Docker'].map(s => <span key={s} className="px-[2px] py-[1px] bg-white rounded-sm text-[3px] text-gray-600 border border-gray-100">{s}</span>)}
                 </div>
               </div>
               <div>
                 <div className="text-[4px] font-bold mb-0.5" style={{ color: accent }}>CONTACT</div>
                 <div className="text-[3px] text-gray-500 space-y-0.5">
                   <div>hello@example.com</div>
                   <div>+1 234 567 890</div>
                   <div>New York, NY</div>
                   <div>linkedin.com/in/alexm</div>
                 </div>
               </div>
               <div>
                 <div className="text-[4px] font-bold mb-0.5 mt-1" style={{ color: accent }}>EDUCATION</div>
                 <div className="text-[3px] font-bold text-gray-700">M.S. Computer Science</div>
                 <div className="text-[3px] text-gray-500">Stanford University | 2018</div>
                 <div className="text-[3px] font-bold text-gray-700 mt-1">B.S. Engineering</div>
                 <div className="text-[3px] text-gray-500">MIT | 2016</div>
               </div>
            </div>
            <div className="flex-1 p-2 space-y-2">
               <div>
                  <h3 className="text-[6px] font-black text-gray-800 tracking-tight leading-none mb-0.5">ALEX MORGAN</h3>
                  <p className="text-[4px] font-semibold" style={{ color: accent }}>Full Stack Developer</p>
               </div>
               
               <div className="text-[3px] text-gray-600 leading-[1.3]">
                 Results-driven software engineer with 6+ years experience in scalable web applications, microservices, and leading agile teams to deliver business-critical products.
               </div>

               <div>
                 <div className="text-[4px] font-bold text-gray-700 mb-1 border-b border-gray-100 pb-0.5">EXPERIENCE</div>
                 {[
                   { role: "Senior Engineer", company: "Tech Corp Inc.", date: "2020 - Present" },
                   { role: "Software Engineer", company: "Innovate Solutions", date: "2018 - 2020" },
                   { role: "Frontend Dev", company: "WebStudio Apps", date: "2016 - 2018" }
                 ].map((exp, i) => (
                   <div key={i} className="mb-1.5">
                     <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-[4px] font-bold text-gray-800">{exp.role}</span>
                        <span className="text-[3px] text-gray-400">{exp.date}</span>
                     </div>
                     <div className="text-[3px] font-medium text-gray-600 mb-0.5">{exp.company}</div>
                     <div className="text-[3px] leading-[1.2] text-gray-400 mb-0.5">
                       • Developed responsive web apps. Improved performance by 30%.
                     </div>
                     <div className="text-[3px] leading-[1.2] text-gray-400">
                       • Collaborated with remote teams to deploy scalable backend systems.
                     </div>
                   </div>
                 ))}
               </div>
               
               <div>
                 <div className="text-[4px] font-bold text-gray-700 mb-1 border-b border-gray-100 pb-0.5">PROJECTS</div>
                 <div className="mb-1">
                   <span className="text-[3.5px] font-bold text-gray-800">E-Commerce Analytics Platform</span>
                   <div className="text-[3px] leading-[1.2] text-gray-400 mt-0.5">
                     • Built real-time dashboard tracking daily sales of 10K+ vendors.
                   </div>
                 </div>
                 <div>
                   <span className="text-[3.5px] font-bold text-gray-800">AI Task Manager</span>
                   <div className="text-[3px] leading-[1.2] text-gray-400 mt-0.5">
                     • Integrated OpenAI to auto-categorize tickets, saving 20h/week.
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {type === 'fullwidth' && (
          <div className="p-3 h-full flex flex-col gap-1.5">
             <div className="text-center border-b border-gray-200 pb-1.5 mb-1">
                 <h3 className="text-[8px] font-black text-gray-800 tracking-tight mb-0.5 uppercase">Alex Morgan</h3>
                 <p className="text-[4px] font-medium mb-1" style={{ color: accent }}>Full Stack Developer</p>
                 <div className="flex justify-center gap-2 text-[3.5px] text-gray-500">
                    <span>hello@domain.com</span>•<span>+1 234 567 890</span>•<span>New York, NY</span>•<span>linkedin.com/in/alexm</span>
                 </div>
             </div>
             
             <div className="text-[3.5px] leading-relaxed text-gray-600 mb-1">
               Innovative Full Stack Developer with 6+ years of establishing software architectures and leading full-lifecycle development. Known for optimizing performance and building scalable interfaces.
             </div>
             
             <div>
                 <div className="text-[4px] font-bold text-gray-800 mb-1 border-b border-gray-100 pb-0.5">PROFESSIONAL EXPERIENCE</div>
                 {[
                   { role: "Software Engineer", company: "Tech Solutions Ltd.", date: "Jan 2020 - Present" },
                   { role: "Backend Developer", company: "DataFlow Systems", date: "Mar 2017 - Dec 2019" },
                   { role: "Web Developer", company: "Creative Minds Agency", date: "Jun 2015 - Feb 2017" }
                 ].map((exp, i) => (
                   <div key={i} className="mb-1.5">
                     <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-[4px] font-bold text-gray-800">{exp.role}</span>
                        <span className="text-[3px] font-semibold text-gray-500">{exp.date}</span>
                     </div>
                     <div className="text-[3.5px] italic text-gray-600 mb-0.5">{exp.company}</div>
                     <div className="text-[3px] leading-[1.2] text-gray-400 mb-0.5">
                       • Developed scalable microservices architecture reducing server load by 40%.
                     </div>
                     <div className="text-[3px] leading-[1.2] text-gray-400">
                       • Mentored junior developers and instituted comprehensive code review processes.
                     </div>
                   </div>
                 ))}
             </div>
             
             <div>
                 <div className="text-[4px] font-bold text-gray-800 mb-1 border-b border-gray-100 pb-0.5">EDUCATION & SKILLS</div>
                 <div className="grid grid-cols-2 gap-2">
                   <div>
                     <div className="text-[3.5px] font-bold text-gray-700">M.S. in Computer Science</div>
                     <div className="text-[3px] text-gray-500">University of Technology • 2015</div>
                     <div className="text-[3.5px] font-bold text-gray-700 mt-1">B.S. in Software Eng</div>
                     <div className="text-[3px] text-gray-500">State University • 2013</div>
                   </div>
                   <div>
                     <div className="text-[3.5px] font-bold text-gray-700">Technologies</div>
                     <div className="text-[3px] text-gray-500 leading-tight">React, Node.js, TypeScript, Next.js, Python, PostgreSQL, MongoDB, Redis</div>
                     <div className="text-[3.5px] font-bold text-gray-700 mt-1">DevOps & Cloud</div>
                     <div className="text-[3px] text-gray-500 leading-tight">AWS, Docker, Kubernetes, CI/CD, GitHub Actions</div>
                   </div>
                 </div>
             </div>
          </div>
        )}

        {type === 'centered' && (
          <div className="p-3 h-full flex flex-col gap-2">
             <div className="text-center mb-1">
                 <h3 className="text-[8px] font-black text-gray-800 tracking-widest mb-0.5 uppercase">ALEX MORGAN</h3>
                 <div className="flex justify-center gap-1 text-[3px] text-gray-500 font-medium">
                    <span>hello@example.com</span>|<span>+1 234 567 890</span>|<span>New York, NY</span>|<span>alexmorgan.dev</span>
                 </div>
             </div>
             
             <div className="text-center px-1">
                 <div className="text-[3.5px] leading-relaxed text-gray-600">
                   Dedicated software engineer specializing in scalable system design and frontend architecture. Proven record in increasing performance metrics and leading high-impact cross-functional teams in agile environments.
                 </div>
             </div>

             <div>
                 <div className="text-[4px] font-bold text-gray-800 tracking-widest text-center mb-1 uppercase" style={{ color: accent }}>Experience</div>
                 <div className="space-y-2">
                   {[
                     { role: "Senior Developer", company: "TechNova Inc.", date: "2020 - Present" },
                     { role: "Software Engineer", company: "DataFlow Systems", date: "2017 - 2020" }
                   ].map((exp, i) => (
                     <div key={i} className="grid grid-cols-[1fr_3fr] gap-1.5">
                       <div className="text-[3px] text-right font-medium text-gray-500 pt-[1px]">{exp.date}</div>
                       <div>
                         <div className="text-[4px] font-bold text-gray-800">{exp.role}</div>
                         <div className="text-[3.5px] text-gray-600 italic mb-0.5">{exp.company}</div>
                         <div className="text-[3px] leading-[1.2] text-gray-400 mb-0.5">
                           • Architected highly concurrent data processing pipeline supporting 10x scale.
                         </div>
                         <div className="text-[3px] leading-[1.2] text-gray-400">
                           • Implemented CI/CD pipelines reducing deployment times by 50%.
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
             </div>
             
             <div>
                 <div className="text-[4px] font-bold text-gray-800 tracking-widest text-center mb-1 uppercase" style={{ color: accent }}>Education & Skills</div>
                 <div className="grid grid-cols-[1fr_3fr] gap-1.5 mb-1.5">
                    <div className="text-[3px] text-right font-medium text-gray-500 pt-[1px]">2013 - 2017</div>
                    <div>
                         <div className="text-[4px] font-bold text-gray-800">BS Computer Science</div>
                         <div className="text-[3.5px] text-gray-600 italic">State University</div>
                    </div>
                 </div>
                 <div className="grid grid-cols-[1fr_3fr] gap-1.5">
                    <div className="text-[3px] text-right font-medium text-gray-500 pt-[1px]">Skills</div>
                    <div className="text-[3px] leading-tight text-gray-600 font-medium">
                         React, Next.js, TypeScript, UI/UX Design, System Architecture, Node.js, Express, SQL/NoSQL, AWS, Docker
                    </div>
                 </div>
             </div>
          </div>
        )}

        {type === 'darkheader' && (
          <div className="h-full flex flex-col">
            <div className="p-2 text-white flex flex-col justify-center gap-0.5" style={{ backgroundColor: accent, minHeight: '15%' }}>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-[8px] font-bold tracking-tight">ALEX MORGAN</h3>
                  <p className="text-[4px] font-medium opacity-80">Full Stack Engineer</p>
                </div>
                <div className="text-right text-[3px] font-medium opacity-80 space-y-[1px]">
                  <div>hello@example.com</div>
                  <div>(555) 123-4567</div>
                  <div>San Franciso, CA</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-2.5 flex flex-col gap-2">
               <div>
                 <div className="text-[3.5px] leading-relaxed text-gray-600">
                   Technically sophisticated engineer with an extensive record of transforming complex requirements into reliable, intuitive, and performant software solutions.
                 </div>
               </div>

               <div>
                   <div className="text-[4px] font-black text-gray-800 mb-1 border-b-[0.5px] border-gray-300 pb-0.5 uppercase tracking-wider">Experience</div>
                   {[
                     { role: "Lead Engineer", company: "InnovateTech Labs", date: "2021 - Present" },
                     { role: "Full Stack Developer", company: "Global Systems", date: "2018 - 2021" },
                     { role: "Junior Dev", company: "StartupX", date: "2016 - 2018" }
                   ].map((exp, i) => (
                     <div key={i} className="mb-1.5">
                       <div className="flex justify-between items-baseline mb-[1px]">
                          <span className="text-[4px] font-bold text-gray-800">{exp.role}</span>
                          <span className="text-[3px] font-bold" style={{ color: accent }}>{exp.date}</span>
                       </div>
                       <div className="text-[3.5px] text-gray-600 mb-0.5 italic">{exp.company}</div>
                       <div className="text-[3px] leading-[1.2] text-gray-500 mb-0.5">
                         • Redesigned frontend rendering pipeline, slashing TTI by 60%.
                       </div>
                       <div className="text-[3px] leading-[1.2] text-gray-500">
                         • Migrated legacy monolithic backend to scalable Serverless architecture.
                       </div>
                     </div>
                   ))}
               </div>
               
               <div>
                   <div className="text-[4px] font-black text-gray-800 mb-1 border-b-[0.5px] border-gray-300 pb-0.5 uppercase tracking-wider">Education & Skills</div>
                   <div className="grid grid-cols-2 gap-2">
                     <div>
                       <div className="text-[3.5px] font-bold text-gray-800">BS in Computer Science</div>
                       <div className="text-[3px] text-gray-600">University of California • 2016</div>
                     </div>
                     <div>
                       <div className="text-[3.5px] font-bold text-gray-800">Core Technologies</div>
                       <div className="text-[3px] text-gray-600 leading-tight">TypeScript, React, Apollo, Node.js, AWS Core, Tailwind</div>
                     </div>
                   </div>
               </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#4F46E5]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
          <span className="text-white font-bold text-sm px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
            Use This →
          </span>
        </div>
      </div>
      <p className="text-center text-sm font-semibold text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors">{name}</p>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ onBuild, onPreviewTemplates }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    { icon: Sparkles, title: "AI Content Writer", desc: "Instantly generate or enhance bullet points using Claude AI." },
    { icon: Target, title: "ATS Score Checker", desc: "Real-time analysis to ensure your resume passes screening bots." },
    { icon: ShieldCheck, title: "Job Match Analyzer", desc: "Paste a job description and get a customized match scorecard." },
    { icon: Presentation, title: "Interview Prep Kit", desc: "Get AI-generated interview questions and model answers based on your resume." },
    { icon: FileText, title: "Cover Letter Builder", desc: "One-click personalized AI cover letter generation." },
    { icon: Download, title: "PDF & DOCX Export", desc: "Download pixel-perfect, ATS-compliant formats instantly." },
  ];

  const faqs = [
    { q: "Is it really free?", a: "QuickResume is completely free to build and download your first few resumes without watermarks. Premium limits may apply for high-volume AI usage." },
    { q: "Is it ATS-friendly?", a: "Yes, all our templates are designed with standard ATS (Applicant Tracking System) parsing in mind—no complex tables or graphics that break parsers." },
    { q: "Can I download as PDF?", a: "Absolutely. You can export to a high-quality PDF at any time with a single click." },
    { q: "Does AI write my resume?", a: "The AI helps enhance your bullet points, generate summaries, and fill in gaps. You always maintain full control over the final content." },
    { q: "Is my data saved?", a: "Your data is saved securely in your browser's local storage automatically. It never leaves your device unless you choose to use our AI enhancement tools." }
  ];

  const avatarColors = ['#4F46E5', '#06B6D4', '#10B981'];
  const initials = ['SL', 'MT', 'PR'];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col font-sans overflow-x-hidden relative">
      <Helmet>
        <title>QuickResume | AI-Powered Resume Builder</title>
        <meta name="description" content="Build a professional, ATS-optimized resume in minutes with our Free AI Resume Builder." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 min-h-[90vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orb rounded-full blur-[100px] -z-10 opacity-70"></div>
        
        <div className="flex-1 flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-sm mb-6 border border-[var(--color-primary)]/20">
            <Sparkles size={16} /> Powered by Claude AI
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.1] mb-6">
            Build Your Resume.<br />
            <span className="text-gradient">Get Hired Faster.</span>
          </h1>
          
          <p className="text-lg text-[var(--text-muted)] mb-10 max-w-xl leading-relaxed">
            Create an ATS-friendly, professional resume in minutes. Let artificial intelligence write, optimize, and format your experience perfectly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={onBuild}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-lg shadow-lg shadow-[var(--color-primary)]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Build My Resume <MoveRight size={20} />
            </button>
            <button
              onClick={() => { if(onPreviewTemplates) { onPreviewTemplates(); } else { onBuild(); } }} 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] text-[var(--text-main)] font-semibold text-lg border border-[var(--color-border)] shadow-sm transition-all"
            >
              See Templates
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-[var(--text-subtle)] font-medium">
              <CheckCircle2 size={18} className="text-[var(--color-success)]" /> 15,000+ Resumes Created
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-subtle)] font-medium">
              <CheckCircle2 size={18} className="text-[var(--color-success)]" /> ATS-Optimized
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-subtle)] font-medium">
              <CheckCircle2 size={18} className="text-[var(--color-success)]" /> 100% Free
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg lg:max-w-none relative perspective-1000 hidden md:block">
          {/* Floating UI visual representation */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-md mx-auto z-20"
          >
            {/* Single unified card */}
            <div className="w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xl flex"
              style={{ height: '600px', boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)' }}
            >
              {/* Left sidebar */}
              <div className="flex-shrink-0 p-5 flex flex-col gap-5"
                style={{ width: '32%', backgroundColor: '#4F46E508', borderRight: '2px solid rgba(79, 70, 229, 0.15)' }}
              >
                 <div>
                   <div className="text-[10px] font-bold text-gray-800 mb-1.5 uppercase font-sans tracking-wide">Contact</div>
                   <div className="text-[8px] text-gray-600 space-y-1.5 font-medium">
                     <div>rahul@example.in</div>
                     <div>+91 98765 43210</div>
                     <div>Bengaluru, KA</div>
                     <div>linkedin.com/in/rahulsharma</div>
                   </div>
                 </div>
                 
                 <div>
                   <div className="text-[10px] font-bold text-gray-800 mb-1.5 uppercase font-sans tracking-wide">Skills</div>
                   <div className="flex flex-wrap gap-1.5">
                     {['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Python', 'Docker', 'GraphQL'].map(s => <span key={s} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-sm text-[7.5px] border border-indigo-100 font-semibold">{s}</span>)}
                   </div>
                 </div>

                 <div>
                   <div className="text-[10px] font-bold text-gray-800 mb-1.5 uppercase font-sans tracking-wide">Education</div>
                   <div className="text-[9px] font-bold text-gray-700">B.Tech in CSE</div>
                   <div className="text-[8px] text-gray-500 font-medium">NIT • 2018</div>
                 </div>
              </div>

              {/* Right main content */}
              <div className="flex-1 p-6 space-y-5">
                {/* Header */}
                <div className="pb-4 border-b border-gray-200">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1.5">RAHUL SHARMA</h3>
                  <p className="text-[11px] font-extrabold text-indigo-600 tracking-wider uppercase">Senior Full Stack Engineer</p>
                </div>
                
                {/* Summary */}
                <div className="text-[9px] leading-[1.6] text-gray-600 font-medium">
                   Innovative and results-driven Senior Full Stack Engineer with over 6 years of experience in designing, developing, and deploying scalable web applications. Proven track record of leading cross-functional teams to deliver high-impact software solutions on time. Passionate about clean code.
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <div className="text-[11px] font-bold text-gray-900 border-b border-gray-200 pb-1.5 uppercase tracking-wide">Experience</div>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[11px] font-bold text-gray-800">Senior Software Engineer</span>
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">2020 - Present</span>
                    </div>
                    <div className="text-[9px] font-bold text-indigo-600 mb-1.5">TechNova Solutions</div>
                    <div className="text-[8.5px] leading-[1.6] text-gray-600 space-y-1 font-medium">
                      <div>• Spearheaded the migration of a legacy monolithic application to a microservices architecture, reducing system latency by 40%.</div>
                      <div>• Designed and implemented robust RESTful APIs using Node.js and Express, supporting 500,000+ active users.</div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[11px] font-bold text-gray-800">Software Engineer</span>
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">2018 - 2020</span>
                    </div>
                    <div className="text-[9px] font-bold text-indigo-600 mb-1.5">Innovatez Technologies</div>
                    <div className="text-[8.5px] leading-[1.6] text-gray-600 space-y-1 font-medium">
                      <div>• Developed responsive and user-friendly single-page applications using React and Redux.</div>
                      <div>• Integrated third-party payment gateways Stripe and Razorpay securely.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges - positioned relative to the card */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 3 }} 
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ delay: 0.5 }}
              className="absolute top-8 -right-6 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg text-xs flex items-center gap-1.5"
              style={{ backgroundColor: '#06B6D4' }}
            >
              ✓ ATS Score: 98%
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -2 }} 
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-24 -left-6 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg text-xs flex items-center gap-1.5 z-30"
              style={{ backgroundColor: '#4F46E5' }}
            >
              ✨ AI Enhanced
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 2 }} 
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ delay: 1.1 }}
              className="absolute bottom-8 -right-4 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg text-xs z-30"
              style={{ backgroundColor: '#10B981' }}
            >
              ⬇ Downloaded
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[var(--color-bg-2)] relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-main)] mb-4">You're 3 steps away from your next job</h2>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto">Our streamlined builder takes the hassle out of writing.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[var(--color-border)] via-[var(--color-primary)] to-[var(--color-border)] opacity-30 border-dashed border-y"></div>
            
            {[
              { num: "01", icon: FileText, title: "Choose a Template", desc: "Select from our library of ATS-optimized designs." },
              { num: "02", icon: Settings2, title: "Fill Your Info", desc: "Input your details and let our AI optimize the wording." },
              { num: "03", icon: Download, title: "Download PDF", desc: "Export your pixel-perfect resume instantly." }
            ].map((step, i) => (
              <div key={i} className="text-center relative z-10 flex flex-col items-center group">
                <div className="w-24 h-24 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-border)] shadow-md flex items-center justify-center mb-6 group-hover:border-[var(--color-primary)] transition-colors relative">
                  <step.icon size={36} className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold flex items-center justify-center shadow-lg">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{step.title}</h3>
                <p className="text-[var(--text-subtle)] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">Professional Templates</h2>
            <p className="text-[var(--text-muted)] max-w-xl">Proven structures designed to get you past ATS gateways and into interviews.</p>
          </div>
          <button onClick={() => { if(onPreviewTemplates) { onPreviewTemplates(); } else { onBuild(); } }} className="text-[var(--color-primary)] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All Templates <MoveRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {TEMPLATE_PREVIEWS.map(t => <TemplateThumbnail key={t.name} {...t} onBuild={onBuild} />)}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-gradient-to-b from-[var(--color-bg-2)] to-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">Everything you need to land the job</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="bg-[var(--color-bg)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-colors shadow-sm hover:shadow-xl hover:shadow-[var(--color-primary)]/5 group">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-3)] text-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{feat.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-[var(--color-border)]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">Loved by Job Seekers</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah L.", role: "Software Engineer at Google", quote: "The AI summary writer saved me hours of staring at a blank page. Got me interviews at FAANG." },
            { name: "Michael T.", role: "MBA Student", quote: "Finally, a resume builder that actually exports clean PDFs without messing up the formatting. 10/10." },
            { name: "Priya R.", role: "Graphic Designer", quote: "Even though I can design my own, this tool's ATS optimization feature highlighted keywords I hadn't thought of." }
          ].map((test, i) => (
             <div key={i} className="bg-[var(--color-bg-2)] p-8 rounded-2xl border border-[var(--color-border)]">
               <div className="flex text-amber-400 mb-4">
                 {[1,2,3,4,5].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
               </div>
               <p className="text-[var(--text-main)] mb-6 text-[15px] leading-relaxed relative">
                 "{test.quote}"
               </p>
               <div className="flex items-center gap-4">
                 <div 
                   className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                   style={{ backgroundColor: avatarColors[i] }}
                 >
                   {initials[i]}
                 </div>
                 <div>
                   <h4 className="font-bold text-[var(--text-main)] text-sm flex items-center gap-1">
                     {test.name}
                     <span className="text-[#06B6D4] text-xs">✓</span>
                   </h4>
                   <p className="text-[var(--text-subtle)] text-xs">{test.role}</p>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[var(--color-bg-2)] border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[var(--text-main)] mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-[var(--text-main)]"
                >
                  {faq.q}
                  <ChevronDown size={20} className={`transform transition-transform ${openFaq === i ? 'rotate-180' : ''} text-[var(--text-subtle)]`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-[var(--text-muted)] text-[15px] leading-relaxed border-t border-[var(--color-border)] pt-4">
                         {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Logo className="h-6" />
          
          <div className="flex flex-wrap justify-center gap-6 text-[var(--text-muted)] text-sm font-medium">
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Contact</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Blog</a>
          </div>

          <div className="flex gap-4 opacity-70">
             {/* Simple social placeholders */}
             <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:text-[var(--color-primary)] cursor-pointer"><span className="text-xs">X</span></div>
             <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:text-[var(--color-primary)] cursor-pointer"><span className="text-xs">In</span></div>
             <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:text-[var(--color-primary)] cursor-pointer"><span className="text-xs">Git</span></div>
          </div>
        </div>
        <div className="text-center text-[var(--text-subtle)] text-xs">
          Made with &hearts; in India. &copy; {new Date().getFullYear()} QuickResume.app.
        </div>
      </footer>
    </div>
  );
};

export default Home;
