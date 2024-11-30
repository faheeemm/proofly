"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export default function BusinessExpenseTemplatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    transactionType: 'expense',
    date: new Date().toISOString().split('T')[0],
    currency: 'USD',
    totalAmount: '1250.75',
    businessName: 'TechCorp Innovations',
    businessAddress: '123 Tech Lane, Silicon Valley, CA 94000',
    taxId: '84-1234567',
    contactEmail: 'finance@techcorp.com',
    items: [
      {
        description: 'Conference Registration',
        quantity: 2,
        unitPrice: 350.00,
        total: 700.00
      },
      {
        description: 'Business Travel Accommodation',
        quantity: 1,
        unitPrice: 450.75,
        total: 450.75
      },
      {
        description: 'Meals and Incidentals',
        quantity: 1,
        unitPrice: 100.00,
        total: 100.00
      }
    ]
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('Business Expense Receipt', 105, 20, { align: 'center' });
    
    // Business Info
    doc.setFontSize(10);
    doc.text(`Business: ${formData.businessName}`, 20, 40);
    doc.text(`Address: ${formData.businessAddress}`, 20, 47);
    doc.text(`Tax ID: ${formData.taxId}`, 20, 54);
    doc.text(`Email: ${formData.contactEmail}`, 20, 61);
    
    // Transaction Details
    doc.text(`Date: ${formData.date}`, 150, 40);
    doc.text(`Currency: ${formData.currency}`, 150, 47);
    doc.text(`Transaction Type: ${formData.transactionType}`, 150, 54);
    
    // Items Table
    doc.setFontSize(10);
    doc.text('Items', 20, 75);
    doc.autoTable({
      startY: 80,
      head: [['Description', 'Quantity', 'Unit Price', 'Total']],
      body: formData.items.map(item => [
        item.description, 
        item.quantity.toString(), 
        `$${item.unitPrice.toFixed(2)}`, 
        `$${item.total.toFixed(2)}`
      ])
    });
    
    // Total
    const total = formData.items.reduce((sum, item) => sum + item.total, 0);
    doc.text(`Total Amount: $${total.toFixed(2)}`, 20, (doc as any).autoTable.previous.finalY + 20);
    
    doc.save('business_expense_receipt.pdf');
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 mt-14">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Business Expense Template
          </h2>
        </div>

        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Transaction Details</h4>
              <p>Type: {formData.transactionType}</p>
              <p>Date: {formData.date}</p>
              <p>Currency: {formData.currency}</p>
              <p>Total Amount: ${formData.totalAmount}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Information</h4>
              <p>Name: {formData.businessName}</p>
              <p>Address: {formData.businessAddress}</p>
              <p>Tax ID: {formData.taxId}</p>
              <p>Email: {formData.contactEmail}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Line Items</h4>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-950">
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Unit Price</th>
                  <th className="p-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-center">${item.unitPrice.toFixed(2)}</td>
                    <td className="p-2 text-center">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => router.push('/generate')}
            >
              Back to Templates
            </Button>
            <Button onClick={generatePDF}>
              Generate PDF
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}