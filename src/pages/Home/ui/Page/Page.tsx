import { FC, useRef } from "react";
import { ResumeForm, ResumePreview, DownloadButton, ThemeToggle } from "@/components";

const Home: FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <section className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800 py-4 md:py-8 transition-colors duration-200">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex justify-center items-center mb-4">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mr-4">ATS Resume Builder</h1>
              <ThemeToggle />
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Create an ATS-friendly resume that gets noticed</p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
            {/* Form Section */}
            <div className="order-2 xl:order-1">
              <ResumeForm />
            </div>
            
            {/* Preview Section */}
            <div className="order-1 xl:order-2">
              <div className="xl:sticky xl:top-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">Live Preview</h2>
                  <DownloadButton resumeElementRef={resumeRef} />
                </div>
                <div className="bg-white border rounded-lg overflow-hidden">
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
