import jsPDF from 'jspdf';
import { ResumeData } from '@/contexts/ResumeContext';

export interface PDFOptions {
  filename?: string;
}

const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
  if (current) return `${startDate} - Present`;
  return `${startDate} - ${endDate}`;
};

export const generatePDF = async (resumeData: ResumeData, options: PDFOptions = {}) => {
  const {
    filename = 'resume.pdf'
  } = options;

  try {
    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set font to Arial (closest to Arial in jsPDF)
    pdf.setFont('helvetica', 'normal');
    
    let yPosition = 20; // Start position from top
    const leftMargin = 20; // More left margin for better spacing
    const rightMargin = 190; // Adjusted right margin accordingly
    const lineHeight = 4;
    const sectionSpacing = 8;

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const { fontSize = 11, fontStyle = 'normal', maxWidth = 170 } = options;
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * (fontSize * 0.35)); // Return new y position
    };

    // Helper function to add a horizontal line
    const addHorizontalLine = (y: number) => {
      pdf.setLineWidth(0.2); // Much thinner line
      pdf.setDrawColor(0, 0, 0); // Pure black
      pdf.line(leftMargin, y, rightMargin, y);
      return y; // Return same position, spacing controlled manually
    };

    // Header Section
    if (resumeData.header.name) {
      yPosition = addText(resumeData.header.name, leftMargin, yPosition, { fontSize: 16, fontStyle: 'bold' });
      yPosition += 2;
    }

    // Contact Info
    const contactInfo = [
      resumeData.header.location,
      resumeData.header.email, 
      resumeData.header.phone,
      resumeData.header.linkedin,
      resumeData.header.github
    ].filter(Boolean).join(' | ');
    
    if (contactInfo) {
      yPosition = addText(contactInfo, leftMargin, yPosition, { fontSize: 11 });
      yPosition += sectionSpacing;
    }

    // Professional Experience Section
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      yPosition = addText('Professional Experience', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 6; // More space after line
      
      resumeData.experiences.forEach((exp, index) => {
        if (index > 0) yPosition += 6; // More space between experiences
        
        // Company and Role with dates on same line
        const jobTitle = `${exp.company}${exp.company && exp.role ? ' / ' : ''}${exp.role}`;
        if (jobTitle.trim()) {
          yPosition = addText(jobTitle, leftMargin, yPosition, { fontSize: 11, fontStyle: 'bold' });
          
          // Dates (on same line, right-aligned)
          if (exp.startDate || exp.endDate || exp.current) {
            const dateText = formatDateRange(exp.startDate, exp.endDate, exp.current);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'italic');
            const dateWidth = pdf.getTextWidth(dateText);
            pdf.text(dateText, rightMargin - dateWidth, yPosition - 4);
          }
          yPosition += 2; // Small space after title line
        }
        
        // Bullet points
        if (exp.bullets && exp.bullets.length > 0) {
          exp.bullets.forEach(bullet => {
            if (bullet.trim()) {
              yPosition += 3;
              yPosition = addText(`• ${bullet}`, leftMargin + 5, yPosition, { fontSize: 11 });
            }
          });
        }
      });
      yPosition += sectionSpacing;
    }

    // Education Section
    if (resumeData.education && resumeData.education.length > 0) {
      yPosition = addText('Education', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 6; // More space after line
      
      resumeData.education.forEach((edu, index) => {
        if (index > 0) yPosition += 5;
        
        // School name with dates on same line
        if (edu.school) {
          yPosition = addText(edu.school, leftMargin, yPosition, { fontSize: 11, fontStyle: 'bold' });
          
          // Dates (on same line, right-aligned)
          if (edu.startDate || edu.endDate) {
            const dateText = `${edu.startDate}${edu.startDate && edu.endDate ? ' - ' : ''}${edu.endDate}`;
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'italic');
            const dateWidth = pdf.getTextWidth(dateText);
            pdf.text(dateText, rightMargin - dateWidth, yPosition - 4);
          }
        }
        
        // Degree on next line
        if (edu.degree) {
          yPosition = addText(edu.degree, leftMargin, yPosition, { fontSize: 11 });
        }
        
        yPosition += 2; // Small space after education item
      });
      yPosition += sectionSpacing;
    }

    // Projects & Achievements Section
    if (resumeData.projects && resumeData.projects.length > 0) {
      yPosition = addText('Projects & Achievements', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 6; // More space after line
      
      resumeData.projects.forEach((project, index) => {
        if (index > 0) yPosition += 3;
        
        if (project.name) {
          yPosition = addText(project.name, leftMargin, yPosition, { fontSize: 11, fontStyle: 'bold' });
        }
        
        if (project.description) {
          yPosition = addText(project.description, leftMargin, yPosition, { fontSize: 11 });
        }
      });
      yPosition += sectionSpacing;
    }

    // Skills Section
    if (resumeData.skills && resumeData.skills.length > 0) {
      yPosition = addText('Skills', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 6; // More space after line
      
      const skillsText = resumeData.skills.join(', ');
      yPosition = addText(skillsText, leftMargin, yPosition, { fontSize: 11 });
    }

    // Save the PDF
    pdf.save(filename);
    
    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const downloadResumeAsPDF = async (resumeData: ResumeData, candidateName?: string) => {
  const filename = candidateName 
    ? `${candidateName.replace(/\s+/g, '_')}_Resume.pdf`
    : 'Resume.pdf';
    
  return generatePDF(resumeData, {
    filename
  });
};