import { FC, useState } from "react";
import { useResume, Experience, Education, Project, Certification } from "@/contexts/ResumeContext";

const ResumeForm: FC = () => {
  const { resumeData, updateHeader, updateExperiences, updateEducation, updateProjects, updateCertifications, updateSkills } = useResume();
  const [skillsInput, setSkillsInput] = useState(resumeData.skills.join(", "));

  const handleHeaderChange = (field: string, value: string) => {
    updateHeader({ [field]: value });
  };

  const handleSkillsChange = (value: string) => {
    setSkillsInput(value);
    const skillsArray = value.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
    updateSkills(skillsArray);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [""]
    };
    updateExperiences([...resumeData.experiences, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = resumeData.experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateExperiences(updated);
  };

  const removeExperience = (id: string) => {
    updateExperiences(resumeData.experiences.filter(exp => exp.id !== id));
  };

  const addBullet = (expId: string) => {
    const updated = resumeData.experiences.map(exp => 
      exp.id === expId ? { ...exp, bullets: [...exp.bullets, ""] } : exp
    );
    updateExperiences(updated);
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const updated = resumeData.experiences.map(exp => 
      exp.id === expId ? { 
        ...exp, 
        bullets: exp.bullets.map((bullet, index) => index === bulletIndex ? value : bullet)
      } : exp
    );
    updateExperiences(updated);
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    const updated = resumeData.experiences.map(exp => 
      exp.id === expId ? { 
        ...exp, 
        bullets: exp.bullets.filter((_, index) => index !== bulletIndex)
      } : exp
    );
    updateExperiences(updated);
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      startDate: "",
      endDate: ""
    };
    updateEducation([...resumeData.education, newEducation]);
  };

  const updateEducationItem = (id: string, field: keyof Education, value: string) => {
    const updated = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateEducation(updated);
  };

  const removeEducation = (id: string) => {
    updateEducation(resumeData.education.filter(edu => edu.id !== id));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: ""
    };
    updateProjects([...resumeData.projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = resumeData.projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateProjects(updated);
  };

  const removeProject = (id: string) => {
    updateProjects(resumeData.projects.filter(proj => proj.id !== id));
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: ""
    };
    updateCertifications([...resumeData.certifications, newCertification]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    const updated = resumeData.certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    updateCertifications(updated);
  };

  const removeCertification = (id: string) => {
    updateCertifications(resumeData.certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 md:p-8 shadow-soft-lg rounded-2xl max-h-[calc(100vh-120px)] overflow-y-auto transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-glow">
      <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Resume Builder</h2>
      
      <div className="space-y-8">
        {/* Header Information */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={resumeData.header.name}
                onChange={(e) => handleHeaderChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={resumeData.header.location}
                onChange={(e) => handleHeaderChange("location", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="New York, NY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={resumeData.header.email}
                onChange={(e) => handleHeaderChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="john.doe@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={resumeData.header.phone}
                onChange={(e) => handleHeaderChange("phone", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn
              </label>
              <input
                type="text"
                value={resumeData.header.linkedin}
                onChange={(e) => handleHeaderChange("linkedin", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GitHub
              </label>
              <input
                type="text"
                value={resumeData.header.github}
                onChange={(e) => handleHeaderChange("github", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="github.com/johndoe"
              />
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
          <div className="mx-4">
            <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
        </div>

        {/* Professional Experience */}
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
              Professional Experience
            </h3>
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-soft hover:shadow-soft-lg btn-smooth whitespace-nowrap"
            >
              Add Experience
            </button>
          </div>
          <div className="space-y-5">
            {resumeData.experiences.map((exp) => (
              <div key={exp.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm transition-all duration-200 hover:shadow-soft animate-scale-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="January 2022"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        disabled={exp.current}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100"
                        placeholder="December 2023"
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                          className="mr-1"
                        />
                        <span className="text-sm">Current</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Responsibilities & Achievements
                    </label>
                    <button
                      onClick={() => addBullet(exp.id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-sm hover:shadow btn-smooth"
                    >
                      Add Bullet
                    </button>
                  </div>
                  <div className="space-y-2">
                    {exp.bullets.map((bullet, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => updateBullet(exp.id, index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="• Developed and maintained web applications..."
                        />
                        {exp.bullets.length > 1 && (
                          <button
                            onClick={() => removeBullet(exp.id, index)}
                            className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow btn-smooth"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-soft hover:shadow btn-smooth"
                >
                  Remove Experience
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
          <div className="mx-4">
            <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
        </div>

        {/* Education */}
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
              Education
            </h3>
            <button
              onClick={addEducation}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-soft hover:shadow-soft-lg btn-smooth whitespace-nowrap"
            >
              Add Education
            </button>
          </div>
          <div className="space-y-5">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm transition-all duration-200 hover:shadow-soft animate-scale-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducationItem(edu.id, "degree", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      School
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducationItem(edu.id, "school", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="University of Technology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateEducationItem(edu.id, "startDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="September 2018"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducationItem(edu.id, "endDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="May 2022"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-soft hover:shadow btn-smooth"
                >
                  Remove Education
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
          <div className="mx-4">
            <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
        </div>

        {/* Projects */}
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
              Projects & Achievements
            </h3>
            <button
              onClick={addProject}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-soft hover:shadow-soft-lg btn-smooth whitespace-nowrap"
            >
              Add Project
            </button>
          </div>
          <div className="space-y-5">
            {resumeData.projects.map((project) => (
              <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm transition-all duration-200 hover:shadow-soft animate-scale-in">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, "name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      rows={3}
                      placeholder="Built a full-stack e-commerce application with React, Node.js, and MongoDB..."
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeProject(project.id)}
                  className="mt-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Remove Project
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
          <div className="mx-4">
            <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
        </div>

        {/* Certifications */}
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
              Certifications
            </h3>
            <button
              onClick={addCertification}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-soft hover:shadow-soft-lg btn-smooth whitespace-nowrap"
            >
              Add Certification
            </button>
          </div>
          <div className="space-y-5">
            {resumeData.certifications.map((cert) => (
              <div key={cert.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm transition-all duration-200 hover:shadow-soft animate-scale-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Certification Name
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="AWS Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date Obtained
                    </label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="March 2023"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-soft hover:shadow btn-smooth"
                >
                  Remove Certification
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
          <div className="mx-4">
            <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
        </div>

        {/* Skills */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
            Skills
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills (comma separated)
            </label>
            <textarea
              value={skillsInput}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
              rows={3}
              placeholder="JavaScript, TypeScript, React, Node.js, Python, SQL, MongoDB, AWS, Git, Docker"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate skills with commas. They will appear as a clean list in your resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
