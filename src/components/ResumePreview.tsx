import { forwardRef, useEffect, useState } from "react";
import { useResume } from "@/contexts/ResumeContext";

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { resumeData } = useResume();
  const [isOverflowing, setIsOverflowing] = useState(false);

  const hasContent = (obj: any): boolean => {
    if (Array.isArray(obj)) return obj.length > 0;
    if (typeof obj === 'object') return Object.values(obj).some(v => v !== "");
    return obj !== "";
  };

  // Check for content overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (ref && 'current' in ref && ref.current) {
        const element = ref.current;
        const isContentOverflowing = element.scrollHeight > element.clientHeight;
        setIsOverflowing(isContentOverflowing);
      }
    };

    // Check overflow on content changes
    checkOverflow();
    
    // Also check on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [resumeData, ref]);

  return (
    <div ref={ref} className="bg-white shadow-lg mx-auto text-black no-page-break relative" style={{fontFamily: 'Arial, Helvetica, sans-serif', maxWidth: '100%', width: '210mm', height: 'auto', minHeight: '297mm', fontSize: '11px', lineHeight: '1.3', paddingTop: '0.3in', paddingBottom: '0.2in', paddingLeft: '0.4in', paddingRight: '0.4in'}}>
      {/* Header Section */}
      <header className="mb-4">
        <h1 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '2px'}}>
          {resumeData.header.name || "Your Name"}
        </h1>
        <div style={{fontSize: '11px'}}>
          {[
            resumeData.header.location,
            resumeData.header.email, 
            resumeData.header.phone,
            resumeData.header.linkedin ? 'LinkedIn' : null,
            resumeData.header.github ? 'GitHub' : null
          ].filter(Boolean).join(' | ')}
        </div>
      </header>

      {/* Professional Experience Section */}
      {hasContent(resumeData.experiences) && (
        <section style={{marginBottom: '16px', pageBreakInside: 'avoid'}}>
          <h2 style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '2px'}}>
            Professional Experience
          </h2>
          <hr style={{
            border: 'none',
            borderTop: '1px solid #000',
            margin: '0 0 8px 0',
            padding: 0,
            height: 0,
            backgroundColor: 'transparent'
          }} />
          <div>
            {resumeData.experiences.map((exp, index) => (
              <div key={exp.id} style={{marginBottom: index < resumeData.experiences.length - 1 ? '8px' : '0'}}>
                <div style={{marginBottom: '3px'}}>
                  <div style={{display: 'inline-block', width: '70%'}}>
                    <strong>{exp.company}</strong>
                    {exp.company && exp.role && " / "}
                    {exp.role}
                  </div>
                  <div style={{display: 'inline-block', width: '30%', textAlign: 'right', fontSize: '10px', fontStyle: 'italic', color: '#666'}}>
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.current) && "–"} {exp.current ? "current" : exp.endDate}
                  </div>
                </div>
                {exp.bullets.length > 0 && (
                  <ul style={{paddingLeft: '12px', margin: '0 0 4px 0'}}>
                    {exp.bullets.map((bullet, bulletIndex) => (
                      bullet.trim() && <li key={bulletIndex} style={{marginBottom: '1px'}}>{bullet}</li>
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
        <section style={{marginBottom: '16px', pageBreakInside: 'avoid'}}>
          <h2 style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '2px'}}>
            Education
          </h2>
          <hr style={{
            border: 'none',
            borderTop: '1px solid #000',
            margin: '0 0 8px 0',
            padding: 0,
            height: 0,
            backgroundColor: 'transparent'
          }} />
          <div>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} style={{marginBottom: index < resumeData.education.length - 1 ? '6px' : '0'}}>
                <div style={{marginBottom: '2px'}}>
                  <div style={{display: 'inline-block', width: '70%'}}>
                    <strong>{edu.school}</strong>
                    <div style={{fontSize: '11px'}}>{edu.degree}</div>
                  </div>
                  <div style={{display: 'inline-block', width: '30%', textAlign: 'right', fontSize: '10px', fontStyle: 'italic', color: '#666'}}>
                    {edu.startDate} {edu.startDate && edu.endDate && "–"} {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects & Achievements Section */}
      {hasContent(resumeData.projects) && (
        <section style={{marginBottom: '16px', pageBreakInside: 'avoid'}}>
          <h2 style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '2px'}}>
            Projects & Achievements
          </h2>
          <hr style={{
            border: 'none',
            borderTop: '1px solid #000',
            margin: '0 0 8px 0',
            padding: 0,
            height: 0,
            backgroundColor: 'transparent'
          }} />
          <div>
            {resumeData.projects.map((project, index) => (
              <div key={project.id} style={{marginBottom: index < resumeData.projects.length - 1 ? '6px' : '0'}}>
                <div><strong>{project.name}</strong></div>
                <div style={{fontSize: '11px', marginTop: '1px'}}>
                  {project.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {hasContent(resumeData.skills) && (
        <section style={{marginBottom: '16px', pageBreakInside: 'avoid'}}>
          <h2 style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '2px'}}>
            Skills
          </h2>
          <hr style={{
            border: 'none',
            borderTop: '1px solid #000',
            margin: '0 0 8px 0',
            padding: 0,
            height: 0,
            backgroundColor: 'transparent'
          }} />
          <div style={{fontSize: '11px'}}>
            {resumeData.skills.join(", ")}
          </div>
        </section>
      )}

      {/* Empty state when no data */}
      {!hasContent(resumeData.header) && 
       !hasContent(resumeData.experiences) && 
       !hasContent(resumeData.education) && 
       !hasContent(resumeData.projects) && 
       !hasContent(resumeData.certifications) && 
       !hasContent(resumeData.skills) && (
        <div className="text-center py-12 text-gray-500">
          <p>Start filling out the form to see your resume preview</p>
        </div>
      )}

      {/* Overflow warning */}
      {isOverflowing && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs px-2 py-1 flex items-center justify-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Content exceeds 1 page - reduce content to fit A4 format
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
