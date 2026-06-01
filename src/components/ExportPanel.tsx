import { FC, useState } from 'react';
import { Share2, Download, Copy, CheckCircle2, FileJson, Linkedin, Code2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import toast from 'react-hot-toast';

const GRAD = 'linear-gradient(135deg, #7c3aed, #0ea5e9)';
const PURPLE = '#7c3aed';

const ExportPanel: FC = () => {
  const { data } = useResume();
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  const handleDownloadJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const name = data.personalInfo.firstName ? `\${data.personalInfo.firstName}_resume` : 'resume';
    a.href = url;
    a.download = `\${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON downloaded!');
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
    toast.success('JSON copied!');
  };

  const buildLinkedInAbout = () => {
    const p = data.personalInfo;
    const lines: string[] = [];
    if (data.summary) lines.push(data.summary, '');
    if (data.experience.length > 0) {
      lines.push('💼 Experience');
      data.experience.slice(0, 3).forEach(e => {
        const period = e.isPresent ? `\${e.startDate} – Present` : `\${e.startDate} – \${e.endDate}`;
        lines.push(`• \${e.jobTitle} @ \${e.company} (\${period})`);
        if (e.description) {
          e.description.split('\n').filter(Boolean).slice(0, 2)
            .forEach(b => lines.push(`  – \${b.replace(/^[-•]\\s*/, '')}`));
        }
      });
      lines.push('');
    }
    if (data.skills.length > 0) {
      lines.push('🛠 Skills');
      lines.push(data.skills.slice(0, 12).join(' • '));
      lines.push('');
    }
    if (data.education.length > 0) {
      lines.push('🎓 Education');
      data.education.forEach(e => {
        lines.push(`• \${e.degree}\${e.fieldOfStudy ? ' in ' + e.fieldOfStudy : ''} — \${e.schoolName}`);
      });
      lines.push('');
    }
    const contacts = [p.email, p.linkedin, p.portfolio, p.website].filter(Boolean);
    if (contacts.length > 0) {
      lines.push('📬 Contact');
      contacts.forEach(c => lines.push(`• \${c}`));
    }
    return lines.join('\n');
  };

  const linkedInText = buildLinkedInAbout();

  const handleCopyLinkedIn = () => {
    navigator.clipboard.writeText(linkedInText);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 2000);
    toast.success('LinkedIn text copied!');
  };

  const ExportCard: FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    actions: React.ReactNode;
    accent: string;
  }> = ({ icon, title, description, actions, accent }) => (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-4 mb-3">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: accent }}>
          {icon}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">{actions}</div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm" style={{ background: GRAD }}>
            <Share2 size={20} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Export & Share</h2>
            <p className="text-xs text-gray-400">Resume data ko export karo</p>
          </div>
        </div>

        <ExportCard
          icon={<FileJson size={17} />}
          title="JSON Export"
          description="Full resume data as JSON — backup ya import ke liye"
          accent="#8b5cf6"
          actions={
            <>
              <button onClick={handleDownloadJSON}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-white text-xs font-bold rounded-xl transition-all hover:opacity-90 shadow-sm"
                style={{ background: GRAD }}>
                <Download size={13} /> Download resume.json
              </button>
              <button onClick={handleCopyJSON}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold rounded-xl border transition-all hover:bg-purple-50"
                style={{ borderColor: '#ddd6fe', color: PURPLE }}>
                {copiedJSON ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Copy size={13} />}
                {copiedJSON ? 'Copied!' : 'Copy JSON'}
              </button>
            </>
          }
        />

        <ExportCard
          icon={<Linkedin size={17} />}
          title="LinkedIn About Section"
          description="LinkedIn 'About' section ke liye formatted text"
          accent="#0077b5"
          actions={
            <>
              <button onClick={handleCopyLinkedIn}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-white text-xs font-bold rounded-xl transition-all hover:opacity-90 shadow-sm"
                style={{ background: '#0077b5' }}>
                {copiedLinkedIn ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                {copiedLinkedIn ? 'Copied!' : 'Copy LinkedIn Text'}
              </button>
              <div className="mt-1 bg-gray-50 border border-gray-100 rounded-xl p-3 max-h-36 overflow-y-auto custom-scrollbar">
                <p className="text-[11px] text-gray-500 leading-relaxed whitespace-pre-wrap font-mono">
                  {linkedInText || 'Resume data fill karo pehle...'}
                </p>
              </div>
              <p className="text-[10px] text-gray-400 text-center">Copy → LinkedIn → About section mein paste karo</p>
            </>
          }
        />

        <ExportCard
          icon={<Code2 size={17} />}
          title="Raw Resume Data"
          description="Developer ke liye — raw JSON preview"
          accent="#475569"
          actions={
            <div className="bg-gray-900 rounded-xl p-3 max-h-48 overflow-y-auto custom-scrollbar">
              <pre className="text-[10px] text-emerald-400 font-mono leading-relaxed whitespace-pre-wrap">
                {JSON.stringify({
                  personalInfo: data.personalInfo,
                  skillsCount: data.skills.length,
                  experienceCount: data.experience.length,
                  educationCount: data.education.length,
                  hasSummary: !!data.summary,
                }, null, 2)}
              </pre>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ExportPanel;
