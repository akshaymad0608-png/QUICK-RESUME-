import { FC, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


const Preview: FC = () => {
  const { data } = useResume();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    const name = data.personalInfo?.fullName?.replace(/\s+/g, '-').toLowerCase() || 'resume';
    const filename = `${name}-resume.pdf`;
    
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'letter');
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const contentHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = contentHeight;
      let position = 10;
      
      pdf.addImage(imgData, 'JPEG', 10, position, pdfWidth, contentHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, pdfWidth, contentHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Helmet>
        <title>Preview Resume | QuickResume</title>
      </Helmet>

      {/* Toolbar */}
      <header className="border-b border-slate-200 bg-white p-4 flex justify-between items-center sticky top-0 z-50">
        <button 
          onClick={() => navigate('/build')}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors rounded-md"
        >
          <ArrowLeft size={16} /> Edit Resume
        </button>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-md shadow-md disabled:opacity-50"
        >
          {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          Download PDF
        </button>
      </header>

      {/* Resume Container */}
      <main className="flex-1 flex justify-center p-4 sm:p-8 bg-white overflow-auto">
        <div className="w-full max-w-[850px] shadow-2xl relative border border-slate-200">
          
          {/* Printable Area */}
          <div 
            ref={resumeRef} 
            className="bg-white text-teal-600"
            style={{ 
              width: '100%', 
              minHeight: '1100px', // Letter Size approx 8.5x11 aspect
              padding: '40px 48px',
              fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold uppercase tracking-wide text-[#111827] mb-1">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="text-lg text-[#374151] font-medium mb-3">
                {personalInfo.jobTitle || 'Your Job Title'}
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-[#4b5563]">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                {personalInfo.location && <span>• {personalInfo.location}</span>}
                {personalInfo.linkedin && (
                  <span>
                    • <a href={personalInfo.linkedin} className="text-[#2563eb] hover:underline" target="_blank" rel="noreferrer">
                      {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </span>
                )}
                {personalInfo.portfolio && (
                  <span>
                    • <a href={personalInfo.portfolio} className="text-[#2563eb] hover:underline" target="_blank" rel="noreferrer">
                      {personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            {summary && (
              <div className="mb-6">
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#111827] border-b-2 border-[#111827] pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed">
                  {summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#111827] border-b-2 border-[#111827] pb-1 mb-3">
                  Experience
                </h2>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="font-bold text-[#111827]">{exp.jobTitle}</div>
                        <div className="text-sm font-semibold text-[#111827]">
                          {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <div className="text-sm italic text-[#4b5563] mb-2">{exp.company}</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.responsibilities.map((r, i) => r.trim() && (
                          <li key={i} className="text-sm text-[#374151] leading-relaxed">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#111827] border-b-2 border-[#111827] pb-1 mb-3">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map(edu => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <div className="font-bold text-[#111827]">{edu.degree} in {edu.fieldOfStudy}</div>
                        <div className="text-sm text-[#4b5563]">{edu.schoolName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#111827]">{edu.startYear} – {edu.endYear}</div>
                        {edu.gpa && <div className="text-sm text-[#4b5563]">GPA: {edu.gpa}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#111827] border-b-2 border-[#111827] pb-1 mb-2">
                  Skills
                </h2>
                <p className="text-sm text-[#374151] leading-relaxed">
                  {skills.join(', ')}
                </p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
