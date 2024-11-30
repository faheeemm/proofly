"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf';
import { generateDiningInvoicePDF } from '@/app/generate/dining-invoice-gen';

export default function DiningInvoiceEditorPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      transactionType: 'sale',
      date: new Date().toISOString().split('T')[0],
      currency: 'USD',
      businessName: 'Gourmet Bistro',
      businessAddress: '456 Culinary Street, Foodie District, NY 10001',
      taxId: '12-3456789',
      contactEmail: 'reservations@gourmetbistro.com',
      items: [
        {
          description: 'Steak Dinner',
          quantity: 2,
          unitPrice: 42.00,
          total: 84.00
        },
        {
          description: 'Seafood Appetizer',
          quantity: 1,
          unitPrice: 18.50,
          total: 18.50
        },
        {
          description: 'Wine',
          quantity: 1,
          unitPrice: 35.00,
          total: 35.00
        },
        {
          description: 'Dessert',
          quantity: 2,
          unitPrice: 12.00,
          total: 24.00
        }
      ]
    });


    const generatePDF = () => {
      generateDiningInvoicePDF(formData);
    };
  
    interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

    const handleInputChange = (e: InputChangeEvent) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    interface ItemChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

    const handleItemChange = (index: number, e: ItemChangeEvent) => {
      const { name, value } = e.target;
      const updatedItems: Item[] = [...formData.items];
      
      // Update the specific item
      updatedItems[index] = {
        ...updatedItems[index],
        [name]: name === 'description' ? value : parseFloat(value)
      };
  
      // Recalculate total for the item if quantity or unit price changes
      if (name === 'quantity' || name === 'unitPrice') {
        updatedItems[index].total = 
          updatedItems[index].quantity * updatedItems[index].unitPrice;
      }
  
      setFormData(prev => ({
        ...prev,
        items: updatedItems
      }));
    };
  
    const addNewItem = () => {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, {
          description: 'New Item',
          quantity: 1,
          unitPrice: 0,
          total: 0
        }]
      }));
    };
  
    interface Item {
      description: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }

    interface FormData {
      transactionType: string;
      date: string;
      currency: string;
      businessName: string;
      businessAddress: string;
      taxId: string;
      contactEmail: string;
      items: Item[];
    }


    const removeItem = (index: number) => {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    };
  
    const totalAmount = formData.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 mt-14">
      {/* Buttons outside the main grid */}
      <div className="max-w-7xl mx-auto flex justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={() => router.push('/generate')}
          className="animate-pulse"
        >
          Back to Templates
        </Button>
        <Button 
          onClick={generatePDF}
          className="animate-bounce"
        >
          Generate PDF
        </Button>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_auto_1fr] gap-4">
        {/* Left Column: Editor */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border rounded-lg p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-6">Invoice Editor</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label>Transaction Type</Label>
              <Input 
                name="transactionType" 
                value={formData.transactionType} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input 
                type="date"
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label>Business Name</Label>
              <Input 
                name="businessName" 
                value={formData.businessName} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <Label>Business Address</Label>
              <Input 
                name="businessAddress" 
                value={formData.businessAddress} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label>Tax ID</Label>
              <Input 
                name="taxId" 
                value={formData.taxId} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input 
                name="contactEmail" 
                value={formData.contactEmail} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Invoice Items</h3>
              <Button variant="outline" onClick={addNewItem}>Add Item</Button>
            </div>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                <Input 
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <Input 
                  type="number"
                  name="quantity"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <Input 
                  type="number"
                  name="unitPrice"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <div className="flex items-center">
                  <span className="mr-2">${item.total.toFixed(2)}</span>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          </motion.div>

          <div className="hidden md:block border-r border-gray-200 dark:border-gray-700 my-4"></div>


        {/* Right Column: Live Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border rounded-lg p-8 shadow-sm"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-center mb-8">
            Invoice Preview
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h4 className="font-semibold mb-2">Transaction Details</h4>
              <p>Type: {formData.transactionType}</p>
              <p>Date: {formData.date}</p>
              <p>Currency: {formData.currency}</p>
              <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h4 className="font-semibold mb-2">Restaurant Information</h4>
              <p>Name: {formData.businessName}</p>
              <p>Address: {formData.businessAddress}</p>
              <p>Tax ID: {formData.taxId}</p>
              <p>Email: {formData.contactEmail}</p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h4 className="font-semibold mb-2">Dining Items</h4>
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}