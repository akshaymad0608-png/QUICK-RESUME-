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
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col p-6 overflow-y-auto hidden md:flex shrink-0">
         <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><LayoutTemplate size={18}/> Template Settings</h3>
         
         <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Color Theme</label>
            <div className="flex flex-wrap gap-3">
               {colors.map(c => (
                 <button 
                   key={c} 
                   onClick={() => updateSection('design', { ...data.design, color: c })}
                   className={`w-8 h-8 rounded-full ${data.design.color === c ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-110'} transition-all`}
                   style={{ backgroundColor: c }}
                 />
               ))}
            </div>
         </div>

         <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Font Family</label>
            <select 
               value={data.design.fontFamily}
               onChange={(e) => updateSection('design', { ...data.design, fontFamily: e.target.value })}
               className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
            >
               <option value="'Inter', sans-serif">Inter</option>
               <option value="'Roboto', sans-serif">Roboto</option>
               <option value="'Merriweather', serif">Merriweather</option>
               <option value="'Lora', serif">Lora</option>
               <option value="system-ui, sans-serif">System UI</option>
            </select>
         </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-gray-100 flex flex-col items-center py-8 overflow-y-auto custom-scrollbar relative">
         <div className="max-w-[800px] w-full px-4 mb-4 flex flex-col sm:flex-row justify-between items-center relative z-10 gap-3">
           <div className="text-green-700 bg-green-100 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
             <CheckCircle size={16} /> Resume Complete
           </div>
           
           <div className="flex gap-3">
              <button 
                onClick={handleDownloadDOCX}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                <FileText size={18} />
                Download DOCX
              </button>
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg disabled:opacity-50"
              >
                {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                Download PDF
              </button>
           </div>
         </div>

         {/* Render LivePreview directly */}
         <LivePreview />
      </div>
    </div>
  );
};

export default Finalize;
