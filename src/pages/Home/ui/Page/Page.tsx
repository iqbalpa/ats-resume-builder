import { FC, useRef } from "react";
import { ResumeForm, ResumePreview, DownloadButton, ThemeToggle } from "@/components";

const Home: FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <section className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 py-4 md:py-8 transition-all duration-500">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-6 md:mb-8 animate-fade-in">
            <div className="flex justify-center items-center mb-4">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 bg-clip-text text-transparent mr-4">ATS Resume Builder</h1>
              <div className="animate-scale-in">
                <ThemeToggle />
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 animate-slide-in">Create an ATS-friendly resume that gets noticed</p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10 max-w-7xl mx-auto">
            {/* Form Section */}
            <div className="order-2 xl:order-1 animate-slide-in">
              <ResumeForm />
            </div>
            
            {/* Preview Section */}
            <div className="order-1 xl:order-2 animate-fade-in">
              <div className="xl:sticky xl:top-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
                  <div className="animate-slide-in">
                    <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Live Preview</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">A4 Format (210 × 297 mm) • 1 Page Only • ATS-Friendly Text</p>
                  </div>
                  <div className="animate-scale-in">
                    <DownloadButton />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-soft-lg hover:shadow-glow transition-all duration-300 backdrop-blur-sm">
                  <ResumePreview ref={resumeRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
