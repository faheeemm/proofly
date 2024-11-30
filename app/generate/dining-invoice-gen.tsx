import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  businessName: string;
  businessAddress: string;
  taxId: string;
  contactEmail: string;
  date: string;
  items: InvoiceItem[];
  transactionType: string;
}

export function generateDiningInvoicePDF(formData: InvoiceData) {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: 'Dining Invoice',
    subject: 'Restaurant Invoice',
    author: formData.businessName
  });

  // Colors and Styling
  const primaryColor = '#2563EB';  // Tailwind blue-600
  const textColor = '#1F2937';     // Tailwind gray-800
  const lightColor = '#F3F4F6';    // Tailwind gray-100

  // Document Margins
  const margin = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20
  };

  // Business Header
  doc.setFontSize(18);
  doc.setTextColor(primaryColor);
  doc.text(formData.businessName, margin.left, 30);

  // Business Details
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.text(formData.businessAddress, margin.left, 40);
  doc.text(`Tax ID: ${formData.taxId}`, margin.left, 47);
  doc.text(`Contact: ${formData.contactEmail}`, margin.left, 54);

  // Invoice Details
  doc.text(`Date: ${formData.date}`, 150, 40);
  doc.text(`Transaction: ${formData.transactionType}`, 150, 47);

  // Generate Invoice Number (optional)
  const invoiceNumber = `INV-${new Date().getTime()}`;
  doc.setFontSize(12);
  doc.text(`Invoice #${invoiceNumber}`, margin.left, 70);

  // Items Table
  (doc as any).autoTable({
    startY: 80,
    head: [['Description', 'Quantity', 'Unit Price', 'Total']],
    body: formData.items.map(item => [
      item.description,
      item.quantity,
      `$${item.unitPrice.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]),
    theme: 'striped',
    headStyles: { 
      fillColor: primaryColor,
      textColor: 'white'
    },
    styles: {
      fontSize: 10,
      cellPadding: 4
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' }
    }
  });

  // Calculate Totals
  const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08;  // 8% tax example
  const total = subtotal + tax;

  // Totals Section
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text('Subtotal:', 140, finalY);
  doc.text(`$${subtotal.toFixed(2)}`, 180, finalY);

  doc.text('Tax (8%):', 140, finalY + 8);
  doc.text(`$${tax.toFixed(2)}`, 180, finalY + 8);

  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text('TOTAL:', 140, finalY + 18);
  doc.text(`$${total.toFixed(2)}`, 180, finalY + 18);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(textColor);
  doc.text('Thank you for your business!', margin.left, doc.internal.pageSize.height - 20);

  // Save the PDF
  doc.save('dining_invoice.pdf');
}