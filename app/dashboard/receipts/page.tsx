"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, FileText, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Item {
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

interface ReceiptForm {
  customerName: string;
  customerEmail: string;
  items: Item[];
  currency: string;
  notes: string;
}

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
];

const receiptTemplates = [
  {
    id: "simple",
    name: "Simple Receipt",
    description: "Basic receipt with essential details",
    preview: "/templates/simple.png",
  },
  {
    id: "professional",
    name: "Professional Invoice",
    description: "Detailed invoice with company branding",
    preview: "/templates/professional.png",
  },
  {
    id: "retail",
    name: "Retail Receipt",
    description: "Perfect for retail stores",
    preview: "/templates/retail.png",
  },
  {
    id: "service",
    name: "Service Invoice",
    description: "Ideal for service-based businesses",
    preview: "/templates/service.png",
  },
  {
    id: "modern",
    name: "Modern Design",
    description: "Contemporary layout with clean design",
    preview: "/templates/modern.png",
  },
];

export default function ReceiptsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplateSelection, setShowTemplateSelection] = useState(true);
  const [form, setForm] = useState<ReceiptForm>({
    customerName: "",
    customerEmail: "",
    items: [{ description: "", quantity: 1, price: 0, tax: 0 }],
    currency: "USD",
    notes: "",
  });

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { description: "", quantity: 1, price: 0, tax: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...form.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setForm({ ...form, items: newItems });
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowTemplateSelection(false);
  };

  const handleStartFromScratch = () => {
    setSelectedTemplate(null);
    setShowTemplateSelection(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const total = form.items.reduce((sum, item) => {
        const itemTotal = item.quantity * item.price;
        const tax = (itemTotal * item.tax) / 100;
        return sum + itemTotal + tax;
      }, 0);

      const receipt = {
        user_id: user?.uid,
        customer_name: form.customerName,
        customer_email: form.customerEmail,
        items: form.items,
        total,
        currency: form.currency,
        notes: form.notes,
        date: new Date().toISOString(),
        template_id: selectedTemplate,
      };

      const response = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receipt),
      });

      if (!response.ok) throw new Error("Failed to create receipt");

      toast({
        title: "Success",
        description: "Receipt created successfully",
      });

      // Reset form
      setForm({
        customerName: "",
        customerEmail: "",
        items: [{ description: "", quantity: 1, price: 0, tax: 0 }],
        currency: "USD",
        notes: "",
      });
      setShowTemplateSelection(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create receipt",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showTemplateSelection) {
    return (
      <div className="container mx-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Create New Receipt</CardTitle>
              <CardDescription>Choose a template or start from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cursor-pointer hover:border-primary transition-colors" onClick={handleStartFromScratch}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Start from Scratch
                    </CardTitle>
                    <CardDescription>Create a custom receipt with your own layout</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pencil className="mr-2 h-5 w-5" />
                      Use a Template
                    </CardTitle>
                    <CardDescription>Choose from pre-designed templates</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {receiptTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Receipt</CardTitle>
            <CardDescription>Fill in the details to generate a new receipt</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={form.customerEmail}
                    onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {form.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="grid grid-cols-5 gap-4 items-end"
                  >
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Label>Tax %</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={item.tax}
                          onChange={(e) => updateItem(index, "tax", parseFloat(e.target.value))}
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={form.currency}
                    onValueChange={(value) => setForm({ ...form, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Receipt"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Receipt Preview</CardTitle>
            <CardDescription>Live preview of your receipt</CardDescription>
          </CardHeader>
          <CardContent className="bg-white text-black p-8 rounded-lg min-h-[600px]">
            {/* Preview content will be implemented here */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg h-full flex items-center justify-center">
              <p className="text-gray-500">Preview will be shown here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}