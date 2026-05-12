import React from "react";
import { Helmet } from "react-helmet-async";
import { MoveRight, FileText, Settings2, Download, Sparkles, CheckCircle2 } from "lucide-react";
import Logo from "./Logo";

interface HomeProps {
  onBuild: () => void;
  onPreviewTemplates?: () => void;
}

const Home: React.FC<HomeProps> = ({ onBuild, onPreviewTemplates }) => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col font-sans overflow-x-hidden relative">
      <Helmet>
        <title>QuickResume | Free AI Resume Builder</title>
        <meta name="description" content="Build a professional, ATS-optimized resume in minutes with our Free AI Resume Builder." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center min-h-[85vh] justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orb rounded-full blur-[100px] -z-10 opacity-50"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-sm mb-8 border border-[var(--color-primary)]/20 shadow-sm">
          <Sparkles size={16} /> Powered by AI
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.1] mb-8 max-w-4xl">
          Create a winning resume.<br />
          <span className="text-gradient">Get hired faster.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl leading-relaxed">
          The simplest way to build a professional, ATS-friendly resume. Free forever. No hidden paywalls.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          <button 
            onClick={onBuild}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-lg shadow-lg shadow-[var(--color-primary)]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Create My Resume <MoveRight size={20} />
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-[var(--text-subtle)] font-medium">
            <CheckCircle2 size={18} className="text-[var(--color-success)]" /> ATS-Optimized
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-subtle)] font-medium">
            <CheckCircle2 size={18} className="text-[var(--color-success)]" /> 100% Free
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-subtle)] font-medium">
            <CheckCircle2 size={18} className="text-[var(--color-success)]" /> No Login Required
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[var(--color-bg-2)] relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-main)] mb-4">Just 3 Simple Steps</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[var(--color-border)] via-[var(--color-primary)] to-[var(--color-border)] opacity-30 border-dashed border-y"></div>
            
            {[
              { num: "01", icon: FileText, title: "Choose a Template", desc: "Select from our library of proven, elegant designs." },
              { num: "02", icon: Settings2, title: "Fill Your Info", desc: "Add your details or let our AI assist you." },
              { num: "03", icon: Download, title: "Download PDF", desc: "Export your perfect resume instantly. For free." }
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

      {/* CTA SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
         <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-6">Ready to land your dream job?</h2>
         <p className="text-lg text-[var(--text-muted)] mb-10">Stop struggling with formatting. Let us handle the design while you focus on the content.</p>
         <button 
            onClick={onBuild}
            className="px-8 py-4 rounded-xl bg-[var(--text-main)] hover:bg-[var(--text-subtle)] text-[var(--color-bg)] font-bold text-lg shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            Start Building Now <MoveRight size={20} />
          </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border)] py-10 px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <Logo className="h-6" />
          <div className="text-center text-[var(--text-subtle)] text-sm mt-4">
            Made with &hearts; in India. &copy; {new Date().getFullYear()} QuickResume.app.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
