import { FC, useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { downloadResumeAsPDF } from '@/utils';

interface DownloadButtonProps {
  // No longer need the ref since we're using text-based PDF generation
}

const DownloadButton: FC<DownloadButtonProps> = () => {
  const { resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await downloadResumeAsPDF(resumeData, resumeData.header.name);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`
        px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold text-white transition-all duration-300 text-sm md:text-base btn-smooth
        ${isGenerating 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-soft-lg hover:shadow-glow border border-primary-500/20'
        }
      `}
    >
      {isGenerating ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Generating PDF...</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download as PDF</span>
        </span>
      )}
    </button>
  );
};

export default DownloadButton;
