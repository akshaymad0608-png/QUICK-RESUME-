import { FC } from 'react';
import { useResume } from '../../context/ResumeContext';
import Classic from '../templates/Classic';
import Modern from '../templates/Modern';
import Minimal from '../templates/Minimal';
import Executive from '../templates/Executive';
import { FileText } from 'lucide-react';

const LivePreview: FC = () => {
  const { data } = useResume();
  const { template } = data.design;
  
  // Calculate if resume is completely empty
  const isEmpty = 
    !data.personalInfo.firstName && 
    !data.personalInfo.lastName &&
    !data.personalInfo.email &&
    !data.summary && 
    data.experience.length === 0 && 
    data.education.length === 0 &&
    data.skills.length === 0;

  return (
    <div className="w-full flex-1 flex flex-col bg-white overflow-hidden" id="resume-preview-container">
      {isEmpty ? (
        <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center bg-gray-50/50">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FileText size={40} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your resume is empty</h3>
          <p className="text-gray-500 max-w-sm">
            Start filling your details in the sidebar to see your resume preview here.
          </p>
        </div>
      ) : (
        <div className="origin-top flex justify-center bg-white border border-gray-200 lg:border-transparent m-4 lg:m-0 rounded-xl lg:rounded-none overflow-hidden shadow-sm lg:shadow-none min-h-[1123px]">
          {template === 'modern' && <Modern data={data} />}
          {template === 'minimal' && <Minimal data={data} />}
          {template === 'executive' && <Executive data={data} />}
          {(template === 'classic' || !['modern','minimal','executive'].includes(template)) && <Classic data={data} />}
        </div>
      )}
    </div>
  );
};

export default LivePreview;
