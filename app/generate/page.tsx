"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FileEdit, Plus, CreditCard, Utensils, ShoppingCart, ScanLine, Trash2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function GeneratePage() {
  const [mode, setMode] = useState<'template' | 'scratch' | null>(null);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    transactionType: '',
    date: '',
    currency: '',
    totalAmount: '',
    businessName: '',
    businessAddress: '',
    taxId: '',
    contactEmail: '',
    items: [] as Array<{
      description: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }>
  });
  const [currentItem, setCurrentItem] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  });

  const templates = [
    {
      icon: CreditCard,
      title: "Business Expense",
      description: "Quick template for corporate and travel expenses",
    },
    {
      icon: Utensils,
      title: "Dining Invoice",
      description: "Streamlined receipt for food service transactions",
    },
    {
      icon: ShoppingCart,
      title: "Retail Purchase",
      description: "Customizable template for retail and e-commerce transactions",
    },
    {
      icon: ScanLine,
      title: "Service Invoice",
      description: "Comprehensive template for professional service billing",
    }
  ];

  const formSteps = [
    {
      title: "Transaction Basics",
      description: "Provide fundamental transaction details"
    },
    {
      title: "Business Information",
      description: "Enter business and contact details"
    },
    {
      title: "Line Items",
      description: "Add items to your receipt"
    },
    {
      title: "Review & Generate",
      description: "Confirm all details before generating"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (field: string, value: string | number) => {
    setCurrentItem(prev => ({
      ...prev,
      [field]: value,
      total: field === 'unitPrice' 
        ? Number(currentItem.quantity) * Number(value)
        : field === 'quantity'
        ? Number(value) * Number(currentItem.unitPrice)
        : prev.total
    }));
  };

  const addItem = () => {
    console.log('Current Item:', currentItem);
    if (currentItem.description && currentItem.quantity > 0 && currentItem.unitPrice > 0) {
      console.log('Adding item...');
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, {
          description: currentItem.description,
          quantity: currentItem.quantity,
          unitPrice: currentItem.unitPrice,
          total: currentItem.quantity * currentItem.unitPrice
        }]
      }));
      // Reset current item
      setCurrentItem({
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      });
    } else {
      console.log('Item not added. Check conditions:',
        'Description:', !!currentItem.description,
        'Quantity > 0:', currentItem.quantity > 0,
        'Unit Price > 0:', currentItem.unitPrice > 0
      );
    }
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
        style={{ width: `${((formStep + 1) / formSteps.length) * 100}%` }}
      />
    </div>
  );

  const renderStepNavigation = () => (
    <div className="flex justify-between mt-8">
      {formStep > 0 && (
        <Button 
          variant="outline" 
          onClick={() => setFormStep(step => step - 1)}
        >
          <ChevronLeft className="mr-2" /> Previous
        </Button>
      )}
      
      {formStep < formSteps.length - 1 ? (
        <Button 
          className="ml-auto"
          onClick={() => setFormStep(step => step + 1)}
        >
          Next <ChevronRight className="ml-2" />
        </Button>
      ) : (
        <Button 
          className="ml-auto"
          variant="default"
        >
          Generate Receipt <FileEdit className="ml-2" />
        </Button>
      )}
    </div>
  );

  const renderTransactionBasics = () => (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Transaction Type</Label>
        <Select 
          value={formData.transactionType}
          onValueChange={(value) => handleInputChange('transactionType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sale">Sale</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="invoice">Invoice</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Date</Label>
        <Input 
          type="date" 
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
      </div>
      <div>
        <Label>Currency</Label>
        <Select 
          value={formData.currency}
          onValueChange={(value) => handleInputChange('currency', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="GBP">GBP (£)</SelectItem>
            <SelectItem value="JPY">JPY (¥)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Total Amount</Label>
        <Input 
          type="number" 
          placeholder="Total Amount"
          value={formData.totalAmount}
          onChange={(e) => handleInputChange('totalAmount', e.target.value)}
        />
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Business Name</Label>
        <Input 
          placeholder="Business Name"
          value={formData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
        />
      </div>
      <div>
        <Label>Business Address</Label>
        <Input 
          placeholder="Business Address"
          value={formData.businessAddress}
          onChange={(e) => handleInputChange('businessAddress', e.target.value)}
        />
      </div>
      <div>
        <Label>Tax ID / VAT Number</Label>
        <Input 
          placeholder="Tax ID"
          value={formData.taxId}
          onChange={(e) => handleInputChange('taxId', e.target.value)}
        />
      </div>
      <div>
        <Label>Contact Email</Label>
        <Input 
          type="email"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
        />
      </div>
    </div>
  );

  const renderLineItems = () => (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label>Item Description</Label>
          <Input 
            placeholder="Item Description"
            value={currentItem.description}
            onChange={(e) => handleItemChange('description', e.target.value)}
          />
        </div>
        <div>
          <Label>Quantity</Label>
          <Input 
            type="number"
            placeholder="Quantity"
            value={currentItem.quantity}
            onChange={(e) => handleItemChange('quantity', Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <Label>Unit Price</Label>
          <Input 
            type="number"
            placeholder="Unit Price"
            value={currentItem.unitPrice}
            onChange={(e) => handleItemChange('unitPrice', Number(e.target.value))}
            min={0}
          />
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={addItem}
      >
        <Plus className="mr-2" /> Add Item
      </Button>

      {formData.items.length > 0 && (
        <div className="border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-center">Quantity</th>
                <th className="p-2 text-center">Unit Price</th>
                <th className="p-2 text-center">Total</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.description}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-center">{item.unitPrice}</td>
                  <td className="p-2 text-center">{item.total}</td>
                  <td className="p-2 text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderReviewAndGenerate = () => (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-semibold mb-2">Transaction Details</h4>
          <p>Type: {formData.transactionType}</p>
          <p>Date: {formData.date}</p>
          <p>Currency: {formData.currency}</p>
          <p>Total Amount: {formData.totalAmount}</p>
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
        {formData.items.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
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
                  <td className="p-2 text-center">{item.unitPrice}</td>
                  <td className="p-2 text-center">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted-foreground">No items added</p>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (formStep) {
      case 0: return renderTransactionBasics();
      case 1: return renderBusinessInfo();
      case 2: return renderLineItems();
      case 3: return renderReviewAndGenerate();
      default: return null;
    }
  };

  const renderFormFromScratch = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Create Receipt
        </h2>
        <p className="mt-2 text-muted-foreground">
          {formSteps[formStep].description}
        </p>
      </div>

      {renderProgressBar()}

      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-6 text-center">
          {formSteps[formStep].title}
        </h3>

        {renderStepContent()}

        {renderStepNavigation()}
      </div>
    </motion.div>
  );

  const renderTemplateSelection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Generate Receipt
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose a template or start from scratch
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {templates.map((template, idx) => (
          <motion.div
            key={template.title}
            className="border rounded-lg p-6 shadow-sm bg-card cursor-pointer hover:border-blue-500 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setMode('template')}
            >
            <div className="flex items-center mb-4">
              <div className="mr-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <template.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{template.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{template.description}</p>
            </motion.div>
            ))}
            </div>

            <div className="text-center">
            <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => setMode('scratch')}
            >
            <Plus className="mr-2" /> Start from Scratch
            </Button>
            </div>
            </motion.div>
            );

            return (
            <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 mt-14">
            {mode === null && renderTemplateSelection()}
            {mode === 'scratch' && renderFormFromScratch()}
            {mode === 'template' && <div>Template selection not fully implemented</div>}
            </div>
            );
}