import { FC, useState, useRef, useEffect } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, PenLine, Loader2, ArrowLeft, FileText, ArrowRight } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { uploadResumeFile } from '../utils/uploadResume';
import toast from 'react-hot-toast';

/*
 * This page used to open on a "Dashboard" showing "3 My Resumes", two mock
 * resume cards ("Software Engineer - Default", ATS: 92, "Edited 2 mins
 * ago"), and an "Avg ATS Score: 85 — Excellent" stat — all hard-coded,
 * none of it real. A visitor who had never built a resume saw exactly the
 * same fabricated history as one on their fifth visit, because none of it
 * came from anywhere. The app also only ever stores one resume at a time
 * (ResumeContext keeps a single "resume_data" key in localStorage) — there
 * is no multi-resume list for "3 My Resumes" to have counted in the first
 * place.
 *
 * The real state is binary: either this browser has a saved draft or it
 * doesn't (the same localStorage check ContinueResume.tsx uses on the home
 * page). A draft gets one real card with a real completion percentage, not
 * an invented ATS score. No draft skips straight to "how would you like to
 * start" — no dashboard standing in for one.
 */
interface Draft {
  name: string;
  progress: number;
}

const readDraft = (): Draft | null => {
  try {
    const raw = localStorage.getItem('resume_data');
    if (!raw) return null;
    const d = JSON.parse(raw);
    const pi = d.personalInfo || {};
    const name = [pi.firstName, pi.lastName].filter(Boolean).join(' ').trim();
    const sections = [
      Boolean(name),
      Boolean(d.summary),
      (d.experience || []).length > 0,
      (d.education || []).length > 0,
      (d.skills || []).length > 0,
      (d.projects || []).length > 0,
    ];
    const done = sections.filter(Boolean).length;
    if (done === 0) return null;
    return { name: name || 'your resume', progress: Math.round((done / 6) * 100) };
  } catch {
    return null;
  }
};

const Start: FC = () => {
  const navigate = useNavigate();
  const { setData } = useResume();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(readDraft());
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const okType = /\.(pdf|docx?)$/i.test(file.name) || file.type === 'application/pdf' || file.type.includes('wordprocessingml');
      if (!okType) {
        toast.error('Please upload a PDF or Word (.docx) file.');
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        toast.error('That file is over 4 MB — resume PDFs are usually under 2 MB. Please compress it and try again.');
        return;
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 120000);
      try {
        setIsUploading(true);
        toast.loading('Analyzing resume... this can take up to a minute for scanned PDFs.', { id: 'upload' });
        const res = await uploadResumeFile(file, controller.signal);

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to extract resume');
        }

        const extractedData = await res.json();

        if (extractedData.experience && Array.isArray(extractedData.experience)) {
          extractedData.experience = extractedData.experience.map((e: Record<string, unknown>) => ({ ...e, id: crypto.randomUUID() }));
        }
        if (extractedData.education && Array.isArray(extractedData.education)) {
          extractedData.education = extractedData.education.map((e: Record<string, unknown>) => ({ ...e, id: crypto.randomUUID() }));
        }

        setData((prevData) => ({
          ...prevData,
          ...extractedData,
          personalInfo: {
            ...prevData.personalInfo,
            ...(extractedData.personalInfo || {}),
          },
          experience: extractedData.experience || prevData.experience,
          education: extractedData.education || prevData.education,
          skills: extractedData.skills || prevData.skills,
          summary: extractedData.summary || prevData.summary,
        }));

        const found = [
          extractedData.experience?.length ? `${extractedData.experience.length} experience` : '',
          extractedData.education?.length ? `${extractedData.education.length} education` : '',
          extractedData.skills?.length ? `${extractedData.skills.length} skills` : '',
        ].filter(Boolean).join(' · ');
        toast.success(found ? `Imported: ${found}` : 'Resume imported successfully!', { id: 'upload', duration: 5000 });
        navigate('/build');
      } catch (error: unknown) {
        const aborted = error instanceof DOMException && error.name === 'AbortError';
        toast.error(aborted ? 'Reading took too long — please try again.' : (error instanceof Error ? error.message : 'Error importing resume'), { id: 'upload' });
        console.error(error);
      } finally {
        clearTimeout(timer);
        setIsUploading(false);
      }
    }
  };

  const showPicker = pickerOpen || !draft;

  return (
    <div className="min-h-screen bg-paper text-body flex flex-col font-sans pt-16 md:pt-[72px] selection:bg-pine selection:text-white">
      <Seo
        path="/start"
        title="Start Your Resume | QuickResume"
        description="Create a new resume from scratch or import your existing CV to get started."
        noindex
      />

      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col">
        {!showPicker && draft ? (
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-pine-tint text-pine flex items-center justify-center mb-6">
              <FileText size={30} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3">
              Welcome back
            </h1>
            <p className="text-mist mb-2 max-w-md">
              You have a saved draft on this device — {draft.progress}% complete.
            </p>
            <button
              onClick={() => navigate('/build')}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pine px-6 py-3.5 font-semibold text-white hover:bg-pine-deep transition-colors shadow-sm"
            >
              Continue editing <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setPickerOpen(true)}
              className="mt-3 text-sm font-medium text-mist hover:text-ink transition-colors"
            >
              Start a different resume instead
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            {draft && (
              <button
                onClick={() => setPickerOpen(false)}
                className="flex items-center gap-2 text-ink hover:text-pine transition-colors font-semibold self-start mb-8"
              >
                <ArrowLeft size={18} /> Back
              </button>
            )}

            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4 text-center">
              How would you like to start?
            </h1>
            <p className="text-lg text-mist mb-12 text-center max-w-2xl">
              Create a new resume from scratch, or upload an existing one to redesign and improve it automatically.
            </p>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
              <div
                className="bg-card p-8 rounded-2xl border border-line hover:border-pine hover:shadow-lift transition-all cursor-pointer shadow-card group text-center"
                onClick={() => { if (!isUploading) fileInputRef.current?.click(); }}
              >
                <div className="w-16 h-16 rounded-2xl bg-pine-tint text-pine flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {isUploading ? <Loader2 size={32} className="animate-spin" /> : <UploadCloud size={32} />}
                </div>
                <h2 className="font-display text-xl font-semibold text-ink mb-2">Upload your resume</h2>
                <p className="text-mist mb-6 text-sm">We'll automatically extract your information and format it.</p>
                <div className="text-pine font-semibold group-hover:underline">Browse files...</div>

                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  disabled={isUploading}
                />
              </div>

              <div
                className="bg-card p-8 rounded-2xl border border-line hover:border-pine hover:shadow-lift transition-all cursor-pointer shadow-card group text-center"
                onClick={() => navigate('/templates')}
              >
                <div className="w-16 h-16 rounded-2xl bg-seal-tint text-seal flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <PenLine size={32} />
                </div>
                <h2 className="font-display text-xl font-semibold text-ink mb-2">Start from scratch</h2>
                <p className="text-mist mb-6 text-sm">Choose a template and follow our guided step-by-step assistant.</p>
                <div className="text-ink font-semibold group-hover:underline">Choose a template</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Start;
