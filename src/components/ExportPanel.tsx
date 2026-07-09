import { FC, useState } from 'react';
import { Share2, Download, Copy, CheckCircle2, FileJson, Linkedin, FileText, Lock } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import toast from 'react-hot-toast';

const ExportPanel: FC = () => {
  const { data } = useResume();
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  const handleDownloadJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_resume` : 'resume';
    a.href = url;
    a.download = `${name}.json`;
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
        const period = e.isPresent ? `${e.startDate} – Present` : `${e.startDate} – ${e.endDate}`;
        lines.push(`• ${e.jobTitle} @ ${e.company} (${period})`);
        if (e.description) {
          e.description.split('\n').filter(Boolean).slice(0, 2)
            .forEach(b => lines.push(`  – ${b.replace(/^[-•]\s*/, '')}`));
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
        lines.push(`• ${e.degree}${e.fieldOfStudy ? ' in ' + e.fieldOfStudy : ''} — ${e.schoolName}`);
      });
      lines.push('');
    }
    const contacts = [p.email, p.linkedin, p.portfolio, p.website].filter(Boolean);
    if (contacts.length > 0) {
      lines.push('📬 Contact');
      contacts.forEach(c => lines.push(`• ${c}`));
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

  const handlePremiumAction = () => {
    toast.error('This is a Premium feature. Upgrade to Pro to unlock DOCX Export.');
  };

  const ExportCard: FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    actions: React.ReactNode;
  }> = ({ icon, title, description, actions }) => (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 text-slate-800 shrink-0 border border-slate-200">
          {icon}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-[15px]">{title}</p>
          <p className="text-[13px] text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">{actions}</div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-slate-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white shadow-sm">
            <Share2 size={20} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight">Export & Share</h2>
            <p className="text-xs text-slate-500">Download or share your resume</p>
          </div>
        </div>

        <ExportCard
          icon={<FileText size={20} />}
          title="Word Document (DOCX)"
          description="Export to editable Microsoft Word format"
          actions={
            <button onClick={handlePremiumAction}
              className="w-full py-3 flex items-center justify-center gap-2 text-slate-900 bg-amber-300 text-sm font-bold rounded-xl transition-all hover:bg-amber-400 shadow-sm border border-amber-400">
              <Lock size={14} /> Download as DOCX (Premium)
            </button>
          }
        />

        <ExportCard
          icon={<FileJson size={20} />}
          title="JSON Source"
          description="Full resume data source code backup"
          actions={
            <>
              <button onClick={handleDownloadJSON}
                className="w-full py-2.5 flex items-center justify-center gap-2 bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all hover:bg-indigo-700 shadow-sm">
                <Download size={13} /> Download resume.json
              </button>
              <button onClick={handleCopyJSON}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all">
                {copiedJSON ? <CheckCircle2 size={13} className="text-slate-800" /> : <Copy size={13} />}
                {copiedJSON ? 'Copied!' : 'Copy JSON'}
              </button>
            </>
          }
        />

        <ExportCard
          icon={<Linkedin size={20} />}
          title="LinkedIn About"
          description="Formatted text for LinkedIn About section"
          actions={
            <>
              <button onClick={handleCopyLinkedIn}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-white text-xs font-bold rounded-xl transition-all hover:opacity-90 shadow-sm"
                style={{ background: '#0077b5' }}>
                {copiedLinkedIn ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                {copiedLinkedIn ? 'Copied!' : 'Copy LinkedIn Text'}
              </button>
              <div className="mt-2 bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-36 overflow-y-auto custom-scrollbar">
                <p className="text-[12px] text-slate-600 leading-relaxed whitespace-pre-wrap font-mono">
                  {linkedInText || 'Fill your resume data first...'}
                </p>
              </div>
            </>
          }
        />

      </div>
    </div>
  );
};

export default ExportPanel;
