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
    
    let yPosition = 15; // Smaller top margin to match preview
    const leftMargin = 15; // Smaller left margin to match preview
    const rightMargin = 195; // Adjusted right margin

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const { fontSize = 11, fontStyle = 'normal', maxWidth = 180 } = options; // Adjusted for smaller margins
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * (fontSize * 0.35)); // Tighter line spacing
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
      yPosition = addText(resumeData.header.name, leftMargin, yPosition, { fontSize: 16, fontStyle: 'bold' }); // Name: 16px to match preview
      yPosition += 1;
    }

      // Contact Info
  const contactInfoParts = [
    resumeData.header.location,
    resumeData.header.email,
    resumeData.header.phone,
    resumeData.header.linkedin,
    resumeData.header.github
  ].filter(Boolean);

  if (contactInfoParts.length > 0) {
    let currentX = leftMargin;
    const lineY = yPosition;
    
    contactInfoParts.forEach((part, index) => {
      const isLast = index === contactInfoParts.length - 1;
      const separator = isLast ? '' : ' | ';
      const fullText = part + separator;
      
      // Check if this is LinkedIn or GitHub
      const isLinkedIn = part.includes('linkedin.com');
      const isGitHub = part.includes('github.com');
      
      if (isLinkedIn || isGitHub) {
        // Add as clickable link with display text
        const displayText = isLinkedIn ? 'LinkedIn' : 'GitHub';
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 0, 255); // Blue color for links
        pdf.textWithLink(displayText, currentX, lineY, { url: part.startsWith('http') ? part : `https://${part}` });
        pdf.setTextColor(0, 0, 0); // Reset to black
        
        // Add separator in black
        if (!isLast) {
          const displayWidth = pdf.getTextWidth(displayText);
          pdf.text(' | ', currentX + displayWidth, lineY);
          currentX += pdf.getTextWidth(displayText + separator);
        } else {
          currentX += pdf.getTextWidth(displayText);
        }
      } else {
        // Add as regular text
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 0, 0);
        pdf.text(fullText, currentX, lineY);
        currentX += pdf.getTextWidth(fullText);
      }
    });
    
    yPosition = lineY + (11 * 0.35); // Move to next line
    yPosition += 4; // Reduced space before first section
  }

    // Professional Experience Section
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      yPosition = addText('Professional Experience', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition -= 2.5; // Reduce space above horizontal line
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 5; // Less space after line to match preview
      
      resumeData.experiences.forEach((exp, index) => {
        if (index > 0) yPosition += 4; // Less space between experiencesyan
        
        // Company and Role with dates on same line
        const jobTitle = `${exp.company}${exp.company && exp.role ? ' / ' : ''}${exp.role}`;
        if (jobTitle.trim()) {
          yPosition = addText(jobTitle, leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' }); // Item title: 12px
          
          // Dates (on same line, right-aligned)
          if (exp.startDate || exp.endDate || exp.current) {
            const dateText = formatDateRange(exp.startDate, exp.endDate, exp.current);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'italic');
            const dateWidth = pdf.getTextWidth(dateText);
            pdf.text(dateText, rightMargin - dateWidth, yPosition - 4);
          }
          yPosition += 0.5; // Small space after title line
        }
        
        // Bullet points
        if (exp.bullets && exp.bullets.length > 0) {
          exp.bullets.forEach(bullet => {
            if (bullet.trim()) {
              yPosition += 1; // Reduced space between bullet points
              yPosition = addText(`• ${bullet}`, leftMargin + 5, yPosition, { fontSize: 11 }); // Body: 11px
            }
          });
        }
      });
      yPosition += 4; // Reduced space between sections
    }

    // Education Section
    if (resumeData.education && resumeData.education.length > 0) {
      yPosition = addText('Education', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition -= 2.5; // Reduce space above horizontal line
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 5; // Less space after line to match preview
      
      resumeData.education.forEach((edu, index) => {
        if (index > 0) yPosition += 5;
        
        // School name with dates on same line
        if (edu.school) {
          yPosition = addText(edu.school, leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' }); // Item title: 12px
          
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
          yPosition = addText(edu.degree, leftMargin, yPosition, { fontSize: 11 }); // Body: 11px
        }
        
        yPosition += 2; // Small space after education item
      });
      yPosition += 4; // Reduced space between sections
    }

    // Projects & Achievements Section
    if (resumeData.projects && resumeData.projects.length > 0) {
      yPosition = addText('Projects & Achievements', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition -= 2.5; // Reduce space above horizontal line
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 5; // Less space after line to match preview
      
      resumeData.projects.forEach((project, index) => {
        if (index > 0) yPosition += 3;
        
        if (project.name) {
          yPosition = addText(project.name, leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' }); // Item title: 12px
        }
        
        if (project.description) {
          yPosition = addText(project.description, leftMargin, yPosition, { fontSize: 11 }); // Body: 11px
        }
      });
      yPosition += 4; // Reduced space between sections
    }

    // Skills Section
    if (resumeData.skills && resumeData.skills.length > 0) {
      yPosition = addText('Skills', leftMargin, yPosition, { fontSize: 12, fontStyle: 'bold' });
      yPosition -= 2.5; // Reduce space above horizontal line
      yPosition = addHorizontalLine(yPosition); // Line under title
      yPosition += 5; // Less space after line to match preview
      
      const skillsText = resumeData.skills.join(', ');
      yPosition = addText(skillsText, leftMargin, yPosition, { fontSize: 11 }); // Body: 11px
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