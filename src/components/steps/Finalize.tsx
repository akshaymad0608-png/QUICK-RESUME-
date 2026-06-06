import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Download, FileText, CheckCircle, LayoutTemplate, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import LivePreview from '../Preview/LivePreview';
import toast from 'react-hot-toast';

const colors = ['#2196F3', '#F44336', '#4CAF50', '#9C27B0', '#FF9800', '#333333'];

interface FinalizeProps {
  onBack: () => void;
}

const Finalize: FC<FinalizeProps> = () => {
  const { data, updateSection } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);

  const getFileName = (ext: string) => {
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_${data.personalInfo.lastName}` : 'resume';
    return `${name}_Resume.${ext}`;
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview-container');
    if (!element) return;
    setIsDownloading(true);

    const opt = {
      margin: 0,
      filename: getFileName('pdf'),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsDownloading(false);
      toast.success("PDF Downloaded successfully!");
    });
  };

  const handleDownloadDOCX = () => {
    try {
      // Basic fallback DOCX download using HTML export
      const element = document.getElementById('resume-preview-container');
      if (!element) return;
      
      const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      const footer = "</body></html>";
      const sourceHTML = header + element.innerHTML + footer;
      
      const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      const fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = getFileName('doc');
      fileDownload.click();
      document.body.removeChild(fileDownload);
      toast.success("DOCX Downloaded successfully!");
    } catch {
      toast.error("Failed to download DOCX");
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Settings Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col p-6 overflow-y-auto hidden md:flex shrink-0 shadow-lg relative z-20">
         <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><LayoutTemplate size={18} className="text-primary"/> Template Settings</h3>
         
         <div className="mb-8 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <label className="block text-[13px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Accent Color</label>
            <div className="flex flex-wrap gap-2 mb-3">
               {colors.map(c => (
                 <button 
                   key={c} 
                   onClick={() => updateSection('design', { ...data.design, color: c })}
                   className={`w-7 h-7 rounded-md shadow-sm ${data.design.color === c ? 'ring-2 ring-offset-2 ring-primary' : 'hover:scale-110 border border-gray-200'} transition-all`}
                   style={{ backgroundColor: c }}
                 />
               ))}
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="custom-color" className="text-[13px] font-medium text-gray-500">Custom Hex:</label>
              <input 
                type="color" 
                id="custom-color"
                value={data.design.color || '#2196F3'}
                onChange={(e) => updateSection('design', { ...data.design, color: e.target.value })}
                className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
              />
            </div>
         </div>

         <div className="mb-8 p-4 bg-white rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Heading Font</label>
              <select 
                 value={data.design.headingFont || data.design.fontFamily || "'Inter', sans-serif"}
                 onChange={(e) => updateSection('design', { ...data.design, headingFont: e.target.value })}
                 className="w-full bg-gray-50 text-[14px] text-gray-900 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors cursor-pointer"
              >
                 <option value="'Inter', sans-serif">Inter (Sans)</option>
                 <option value="'Roboto', sans-serif">Roboto (Sans)</option>
                 <option value="'Space Grotesk', sans-serif">Space Grotesk (Modern)</option>
                 <option value="'Outfit', sans-serif">Outfit (Clean)</option>
                 <option value="'Merriweather', serif">Merriweather (Serif)</option>
                 <option value="'Lora', serif">Lora (Serif)</option>
                 <option value="'Playfair Display', serif">Playfair Display (Elegant)</option>
                 <option value="system-ui, sans-serif">System Default</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Body Font</label>
              <select 
                 value={data.design.bodyFont || data.design.fontFamily || "'Inter', sans-serif"}
                 onChange={(e) => updateSection('design', { ...data.design, bodyFont: e.target.value })}
                 className="w-full bg-gray-50 text-[14px] text-gray-900 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors cursor-pointer"
              >
                 <option value="'Inter', sans-serif">Inter (Sans)</option>
                 <option value="'Roboto', sans-serif">Roboto (Sans)</option>
                 <option value="'Merriweather', serif">Merriweather (Serif)</option>
                 <option value="'Lora', serif">Lora (Serif)</option>
                 <option value="system-ui, sans-serif">System Default</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Line Spacing</label>
              <select 
                 value={data.design.lineHeight || "1.5"}
                 onChange={(e) => updateSection('design', { ...data.design, lineHeight: e.target.value })}
                 className="w-full bg-gray-50 text-[14px] text-gray-900 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors cursor-pointer"
              >
                 <option value="1.3">Compact (1.3x)</option>
                 <option value="1.5">Standard (1.5x)</option>
                 <option value="1.7">Relaxed (1.7x)</option>
                 <option value="1.9">Loose (1.9x)</option>
              </select>
            </div>
         </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-[#020617] to-[#020617] flex flex-col items-center py-8 overflow-y-auto custom-scrollbar relative">
         <div className="max-w-[800px] w-full px-4 mb-6 flex flex-col sm:flex-row justify-between items-center relative z-10 gap-3">
           <div className="text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
             <CheckCircle size={16} /> Resume Complete
           </div>
           
           <div className="flex gap-3">
              <button 
                onClick={handleDownloadDOCX}
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg font-bold hover:bg-white/5 hover:text-gray-900 transition-colors shadow-sm"
              >
                <FileText size={18} />
                Download DOCX
              </button>
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-gray-900 px-6 py-2.5 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all disabled:opacity-50 border border-gray-200"
              >
                {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                Download PDF
              </button>
           </div>
         </div>

         {/* Render LivePreview directly */}
         <div className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_70px_-15px_rgba(124,58,237,0.2)] transition-shadow duration-500 rounded-lg overflow-hidden">
             <LivePreview />
         </div>
      </div>
    </div>
  );
};

export default Finalize;
