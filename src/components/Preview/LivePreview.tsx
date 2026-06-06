import { FC } from 'react';
import { useResume } from '../../context/ResumeContext';
import { TEMPLATES } from '../../data/templates';
import Classic from '../templates/Classic';
import Modern from '../templates/Modern';
import Minimal from '../templates/Minimal';
import Executive from '../templates/Executive';
import TwoColumn from '../templates/TwoColumn';
import Sidebar from '../templates/Sidebar';
import Timeline from '../templates/Timeline';
import Creative from '../templates/Creative';
import { FileText } from 'lucide-react';

const LivePreview: FC = () => {
  const { data } = useResume();
  const { template } = data.design;
  
  const templateConfig = TEMPLATES.find(t => t.id === template) || TEMPLATES[0];
  const layout = templateConfig.layout;
  
  const isEmpty = 
    !data.personalInfo?.firstName && 
    !data.personalInfo?.lastName &&
    !data.personalInfo?.email &&
    !data.summary && 
    (!data.experience || data.experience.length === 0) && 
    (!data.education || data.education.length === 0) &&
    (!data.skills || data.skills.length === 0);

  return (
    <div className="w-full flex-1 flex flex-col bg-gray-100 overflow-hidden relative" id="resume-preview-container">
      {isEmpty ? (
        <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center bg-gray-50/50">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <FileText size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Editor Preview</h3>
          <p className="text-gray-500 max-w-sm">
            Enter your details on the left, and your resume will automatically format to your chosen template here.
          </p>
        </div>
      ) : (
        <div className="origin-top flex justify-center border border-gray-200/60 lg:border-transparent m-4 lg:m-0 rounded-xl lg:rounded-none overflow-hidden shadow-xl lg:shadow-none min-h-[1123px] bg-white transition-all duration-300">
          {layout === 'modern' && <Modern data={data} />}
          {layout === 'minimal' && <Minimal data={data} />}
          {layout === 'executive' && <Executive data={data} />}
          {layout === 'two-column' && <TwoColumn data={data} />}
          {layout === 'sidebar' && <Sidebar data={data} />}
          {layout === 'timeline' && <Timeline data={data} />}
          {layout === 'creative' && <Creative data={data} />}
          {(layout === 'classic' || !['modern','minimal','executive','two-column','sidebar','timeline','creative'].includes(layout)) && <Classic data={data} />}
        </div>
      )}
    </div>
  );
};

export default LivePreview;
