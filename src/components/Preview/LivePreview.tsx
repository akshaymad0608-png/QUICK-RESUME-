import { FC } from 'react';
import { useResume } from '../../context/ResumeContext';
import Classic from '../templates/Classic';
import Modern from '../templates/Modern';
import Minimal from '../templates/Minimal';
import Executive from '../templates/Executive';

const allTemplateIds = [
  'celestial', 'galaxy', 'astral', 'eclipse', 'astralis', 'orbit', 'comet', 'solstice',
  'pulsar', 'quasar', 'nebular', 'nova', 'aurora', 'hyperion', 'lunar', 'stellar', 'zenith',
  'aether', 'nebula', 'eon', 'cosmos', 'starburst', 'exoplanet', 'axis', 'keystone', 'helix',
  'horizon', 'quantum', 'classic', 'modern', 'minimal', 'executive'
];

const baseTemplates = ['classic', 'modern', 'minimal', 'executive'];

const LivePreview: FC = () => {
  const { data } = useResume();
  const { template } = data.design;

  const idx = allTemplateIds.indexOf(template);
  const mappedId = idx !== -1 ? baseTemplates[idx % baseTemplates.length] : 'classic';

  return (
    <div className="w-full flex-1 flex flex-col bg-white origin-top" id="resume-preview-container">
      {mappedId === 'classic' && <Classic data={data} />}
      {mappedId === 'modern' && <Modern data={data} />}
      {mappedId === 'minimal' && <Minimal data={data} />}
      {mappedId === 'executive' && <Executive data={data} />}
    </div>
  );
};

export default LivePreview;
