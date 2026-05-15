import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateSummary } from '../../services/geminiService';
import toast from 'react-hot-toast';

const Summary: FC = () => {
  const { data, updateSection } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateSummary(data);
      updateSection('summary', summary);
      toast.success('Summary generated successfully!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate summary.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Summary</h2>
          <p className="text-gray-500">Write a short paragraph highlighting your value.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50 shrink-0"
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Auto-Generate with AI
        </button>
      </div>

      <textarea 
        value={data.summary}
        onChange={(e) => updateSection('summary', e.target.value)}
        className="w-full min-h-[300px] bg-gray-50 border border-gray-200 rounded-xl p-5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 text-sm md:text-base leading-relaxed resize-y"
        placeholder="A highly motivated professional with experience in..."
      />
    </div>
  );
};

export default Summary;
