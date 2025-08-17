import { FC, forwardRef } from "react";
import { useResume } from "@/contexts/ResumeContext";

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const { resumeData } = useResume();

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    if (current) return `${startDate} - Present`;
    return `${startDate} - ${endDate}`;
  };

  const hasContent = (obj: any): boolean => {
    if (Array.isArray(obj)) return obj.length > 0;
    if (typeof obj === 'object') return Object.values(obj).some(v => v !== "");
    return obj !== "";
  };

  return (
    <div ref={ref} className="bg-white p-4 md:p-8 shadow-lg max-w-4xl mx-auto text-black no-page-break" style={{fontFamily: 'Arial, sans-serif', lineHeight: '1.4'}}>
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {resumeData.header.name || "Your Name"}
        </h1>
        <div className="text-center text-sm space-y-1">
          {resumeData.header.location && <div>{resumeData.header.location}</div>}
          <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-1 sm:space-y-0">
            {resumeData.header.email && <span>{resumeData.header.email}</span>}
            {resumeData.header.phone && <span>{resumeData.header.phone}</span>}
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-1 sm:space-y-0">
            {resumeData.header.linkedin && <span>{resumeData.header.linkedin}</span>}
            {resumeData.header.github && <span>{resumeData.header.github}</span>}
          </div>
        </div>
      </header>

      {/* Professional Experience Section */}
      {hasContent(resumeData.experiences) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {resumeData.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm font-medium">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </p>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      bullet.trim() && <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {hasContent(resumeData.education) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-sm">{edu.school}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {formatDateRange(edu.startDate, edu.endDate, false)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects & Achievements Section */}
      {hasContent(resumeData.projects) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">
            PROJECTS & ACHIEVEMENTS
          </h2>
          <div className="space-y-2">
            {resumeData.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-sm">{project.name}</h3>
                <p className="text-sm ml-4">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {hasContent(resumeData.skills) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">
            SKILLS
          </h2>
          <div className="text-sm">
            {resumeData.skills.join(" • ")}
          </div>
        </section>
      )}

      {/* Empty state when no data */}
      {!hasContent(resumeData.header) && 
       !hasContent(resumeData.experiences) && 
       !hasContent(resumeData.education) && 
       !hasContent(resumeData.projects) && 
       !hasContent(resumeData.skills) && (
        <div className="text-center py-12 text-gray-500">
          <p>Start filling out the form to see your resume preview</p>
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
