import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = async (passSlipData) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 15;

  // Helper function to add centered text
  const addCenteredText = (text, y, size = 10, style = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Header
  doc.setFontSize(8);
  addCenteredText('Republic of the Philippines', yPos);
  yPos += 5;

  doc.setFontSize(12);
  addCenteredText('DEPARTMENT OF THE INTERIOR AND LOCAL GOVERNMENT', yPos, 12, 'bold');
  yPos += 6;

  addCenteredText('MISAMIS OCCIDENTAL PROVINCIAL OFFICE', yPos, 12, 'bold');
  yPos += 5;

  doc.setFontSize(9);
  addCenteredText('PEO Compound, Capitol Drive, Lower Lamac, Oroquieta City', yPos);
  yPos += 5;

  doc.setFontSize(9);
  doc.setTextColor(0, 42, 94); // Navy color
  addCenteredText('www.region10.dilg.gov.ph', yPos);
  doc.setTextColor(0, 0, 0); // Reset to black
  yPos += 8;

  // Title
  doc.setFontSize(14);
  addCenteredText('PROPERTY PASS SLIP', yPos, 14, 'bold');
  yPos += 10;

  // Pass slip details
  doc.setFontSize(10);
  doc.text(`Pass Slip No.: ${passSlipData.passSlipNo}`, 20, yPos);
  doc.text(`Date: ${formatDate(passSlipData.date)}`, pageWidth - 60, yPos);
  yPos += 7;

  doc.text(`Requested By: ${passSlipData.requestedBy}`, 20, yPos);
  yPos += 5;
  doc.text(`Signature: ${passSlipData.signature || passSlipData.requestedBy}`, 20, yPos);
  yPos += 5;
  doc.text(`Office: ${passSlipData.office}`, 20, yPos);
  yPos += 10;

  // Details of Property Table
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Details of Property:', 20, yPos);
  yPos += 5;

  const tableData = passSlipData.properties.map((prop) => [
    prop.description,
    prop.serialNumber || 'N/A',
    prop.quantity.toString(),
    prop.condition
  ]);

  doc.autoTable({
    startY: yPos,
    head: [['Item Description', 'Serial Number', 'Quantity', 'Condition']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [10, 42, 94],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: 9,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 40 },
      2: { cellWidth: 25, halign: 'center' },
      3: { cellWidth: 35, halign: 'center' }
    },
    margin: { left: 20, right: 20 }
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Purpose
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Purpose:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 5;
  const purposeLines = doc.splitTextToSize(passSlipData.purpose, pageWidth - 40);
  doc.text(purposeLines, 20, yPos);
  yPos += (purposeLines.length * 5) + 5;

  // Movement Type
  doc.setFont('helvetica', 'bold');
  doc.text('Movement Type:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 5;

  const bringingOut = passSlipData.movementType.bringingOut ? '☑' : '☐';
  const tempRelease = passSlipData.movementType.temporaryRelease ? '☑' : '☐';
  
  doc.text(`${bringingOut} Bringing/Taking OUT`, 25, yPos);
  yPos += 5;
  doc.text(`${tempRelease} Temporary Release`, 25, yPos);
  yPos += 5;

  if (passSlipData.movementType.temporaryRelease && passSlipData.movementType.fromDate) {
    doc.text(
      `Period: ${formatDate(passSlipData.movementType.fromDate)} to ${formatDate(passSlipData.movementType.toDate)}`,
      25,
      yPos
    );
    yPos += 8;
  } else {
    yPos += 3;
  }

  // Authorized By
  doc.setFont('helvetica', 'bold');
  doc.text('Authorized By:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 5;
  doc.text(passSlipData.authorizedBy.name, 20, yPos);
  yPos += 4;
  doc.text(passSlipData.authorizedBy.title, 20, yPos);
  yPos += 4;
  doc.text(`Date: ${formatDate(passSlipData.authorizedBy.date)}`, 20, yPos);
  yPos += 10;

  // Security Check
  doc.setFont('helvetica', 'bold');
  doc.text('Security Check:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 5;
  doc.text('☑ Verified by Property Custodian', 20, yPos);
  yPos += 5;
  doc.text(passSlipData.securityCheck.custodianName, 20, yPos);
  yPos += 4;
  doc.text(passSlipData.securityCheck.custodianTitle, 20, yPos);
  yPos += 10;

  // Return Status
  if (passSlipData.returnStatus && passSlipData.returnStatus.returnedBy) {
    doc.setFont('helvetica', 'bold');
    doc.text('Return Status:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 5;
    doc.text(`Returned By: ${passSlipData.returnStatus.returnedBy}`, 20, yPos);
    yPos += 5;
    doc.text(`Returned On: ${formatDate(passSlipData.returnStatus.returnedOn)}`, 20, yPos);
    yPos += 5;
    
    const conditionText = passSlipData.returnStatus.condition === 'Good' 
      ? '☑ In Good Condition ☐ With Issues'
      : '☐ In Good Condition ☑ With Issues';
    doc.text(conditionText, 20, yPos);
    
    if (passSlipData.returnStatus.condition === 'WithIssues' && passSlipData.returnStatus.remarks) {
      yPos += 5;
      doc.text(`Remarks: ${passSlipData.returnStatus.remarks}`, 20, yPos);
    }
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 25;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  addCenteredText('"Matino, Mahuway at Maaphan"', footerY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  addCenteredText('T: (088) 531-1007 | E: dilg10.misocc@gmail.com', footerY + 5);
  addCenteredText('FB: www.facebook.com/dilgmisoccprovince', footerY + 9);

  // Return as Blob
  return doc.output('blob');
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
