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
    margin = 12.7, // Default A4 margin in mm (0.5 inch)
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
      height: Math.min(element.scrollHeight, 842) // A4 height in pixels at 96dpi ≈ 842px
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: pagebreak
  };

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Apply PDF-specific styles to ensure ATS compatibility (A4 width: 210mm ≈ 8.27in)
  clonedElement.style.width = '210mm';
  clonedElement.style.maxWidth = '210mm';
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
    margin: [12.7, 12.7, 12.7, 12.7], // A4 margins in mm (0.5in = 12.7mm)
    pagebreak: {
      mode: ['avoid-all'],
      avoid: '.no-page-break'
    },
    // Additional options to ensure single page
    enableLinks: false,
    width: 210, // A4 width in mm
    height: 297 // A4 height in mm
  });
};
