import { createContext, useContext, useState, ReactNode, FC } from "react";

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  header: {
    name: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  skills: string[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  updateHeader: (header: Partial<ResumeData['header']>) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateSkills: (skills: string[]) => void;
}

const initialResumeData: ResumeData = {
  header: {
    name: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: ""
  },
  experiences: [],
  education: [],
  projects: [],
  certifications: [],
  skills: []
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: FC<ResumeProviderProps> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updateHeader = (header: Partial<ResumeData['header']>) => {
    setResumeData(prev => ({
      ...prev,
      header: { ...prev.header, ...header }
    }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setResumeData(prev => ({
      ...prev,
      experiences
    }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({
      ...prev,
      education
    }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData(prev => ({
      ...prev,
      projects
    }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setResumeData(prev => ({
      ...prev,
      certifications
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills
    }));
  };

  const value: ResumeContextType = {
    resumeData,
    updateHeader,
    updateExperiences,
    updateEducation,
    updateProjects,
    updateCertifications,
    updateSkills
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
