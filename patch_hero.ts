import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const heroRegex = /\{\/\* 1\. Hero Section \*\/\}([\s\S]*?)<\/section>/;

const newHero = `{/* 1. Hero Section */}
      <section className="relative px-6 pt-20 sm:pt-32 pb-16 sm:pb-24 bg-transparent border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center z-10 w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-3)] border border-[var(--color-border)] text-[var(--color-primary-light)] text-sm font-semibold mb-8 backdrop-blur-md shadow-sm">
              <Sparkles size={14} className="text-[#06b6d4]" /> AI-Powered ATS Resume Builder
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[1.05] tracking-tight mb-8 font-heading">
              Land Your Dream Job <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:drop-shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-500 pb-2 inline-block">
                3x Faster
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
              Create a recruiter-ready resume in minutes. Let our advanced AI
              build the perfect, ATS-optimized layout and write impactful bullet
              points for you. Free forever.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 justify-center w-full sm:w-auto">
              <button
                onClick={() => setCurrentView("app")}
                className="group relative bg-[#ffffff] text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
              >
                <div className="absolute inset-0 bg-black/5 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
                Create Resume Free{" "}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("templates")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-4 rounded-xl font-bold text-lg text-[var(--text-main)] transition-all bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] w-full sm:w-auto"
              >
                See Templates
              </button>
            </div>

            {/* Quick Generator replacing Before/After */}
            <div className="w-full max-w-3xl mx-auto relative group/qg mt-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-[2rem] blur opacity-25 group-hover/qg:opacity-40 transition duration-1000 group-hover/qg:duration-200" />
              <div className="relative glass-card bg-[var(--color-bg-2)]/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-[var(--color-border)] shadow-2xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-6">
                  <span className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2 uppercase tracking-widest bg-[var(--color-bg-3)] px-3 py-1 rounded-md border border-[var(--color-border)]">
                    <Wand2 size={16} className="text-[#06b6d4]" /> Magic Input
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium">✨ Automatically sorted into sections</span>
                </div>
                
                <div className="relative w-full mb-4">
                  <textarea
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    className="w-full bg-[var(--color-bg)]/50 border border-[var(--color-border)] rounded-2xl px-6 py-5 text-base text-[var(--text-main)] focus:outline-none focus:border-[#7c3aed]/50 transition-all resize-none min-h-[140px] font-mono shadow-inner"
                    rows={4}
                    title="Paste Your Job Description or LinkedIn Profile"
                  />
                  {!quickInput && (
                    <div className="absolute top-5 left-6 pointer-events-none z-20 text-[var(--text-subtle)] font-mono text-base h-6 overflow-hidden">
                      <motion.div
                        animate={{
                          y: [0, -24, -24, -48, -48, -72, -72, -96, -96, -120, -120],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 12,
                          ease: "easeInOut",
                        }}
                        className="flex flex-col gap-[0px]"
                      >
                        <span className="h-6 flex items-center">Type "Senior Product Designer"...</span>
                        <span className="h-6 flex items-center">Paste a job description here...</span>
                        <span className="h-6 flex items-center">Paste your LinkedIn about section...</span>
                        <span className="h-6 flex items-center">Type your previous work history...</span>
                        <span className="h-6 flex items-center">Type "Senior Product Designer"...</span>
                        <span className="h-6 flex items-center"></span>
                      </motion.div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    if (quickInput.trim() && onInstantBuild) {
                      onInstantBuild(quickInput);
                    }
                  }}
                  disabled={!quickInput.trim()}
                  className="w-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:from-[#6d28d9] hover:to-[#0891b2] disabled:from-[var(--color-bg-3)] disabled:to-[var(--color-bg-3)] disabled:text-[var(--text-muted)] disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg"
                >
                  Generate Resume Instantly ✨
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>`;

if (heroRegex.test(content)) {
    content = content.replace(heroRegex, newHero);
    fs.writeFileSync('src/components/Home.tsx', content);
    console.log("Hero modified");
} else {
    console.log("Could not find hero matching regex");
}
