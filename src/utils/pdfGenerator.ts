import html2pdf from 'html2pdf.js';

export interface PDFOptions {
  filename?: string;
  margin?: number | [number, number, number, number];
  pagebreak?: {
    mode?: string[];
    before?: string | string[];
    after?: string | string[];
    avoid?: string | string[];
  };
}

export const generatePDF = (element: HTMLElement, options: PDFOptions = {}) => {
  const {
    filename = 'resume.pdf',
    margin = 0.5,
    pagebreak = {
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: '.no-page-break'
    }
  } = options;

  const opt = {
    margin: margin,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      width: element.scrollWidth,
      height: element.scrollHeight
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: pagebreak
  };

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Apply PDF-specific styles to ensure ATS compatibility
  clonedElement.style.width = '8.5in';
  clonedElement.style.maxWidth = '8.5in';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.color = '#000000';
  clonedElement.style.fontFamily = 'Arial, sans-serif';
  clonedElement.style.fontSize = '14px';
  clonedElement.style.lineHeight = '1.4';
  
  // Remove any box shadows, borders that might interfere with ATS
  const elements = clonedElement.querySelectorAll('*');
  elements.forEach((el: Element) => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.boxShadow = 'none';
    htmlEl.style.textShadow = 'none';
    htmlEl.style.filter = 'none';
  });

  return html2pdf().set(opt).from(clonedElement).save();
};

export const downloadResumeAsPDF = (resumeElement: HTMLElement, candidateName?: string) => {
  const filename = candidateName 
    ? `${candidateName.replace(/\s+/g, '_')}_Resume.pdf`
    : 'Resume.pdf';
    
  return generatePDF(resumeElement, {
    filename,
    margin: [0.5, 0.5, 0.5, 0.5], // top, right, bottom, left
    pagebreak: {
      mode: ['avoid-all'],
      avoid: '.no-page-break'
    }
  });
};
