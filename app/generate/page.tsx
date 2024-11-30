"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { Plus, CreditCard, Utensils, ShoppingCart, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function TemplateSelectionPage() {
  const router = useRouter();

  const templates = [
    {
      icon: CreditCard,
      title: "Business Expense",
      description: "Quick template for corporate and travel expenses",
      route: "/generate/business-expense"
    },
    {
      icon: Utensils,
      title: "Dining Invoice",
      description: "Streamlined receipt for food service transactions",
      route: "/generate/dining-invoice"
    },
    {
      icon: ShoppingCart,
      title: "Retail Purchase",
      description: "Customizable template for retail and e-commerce transactions",
      route: "/generate/retail-purchase"
    },
    {
      icon: ScanLine,
      title: "Service Invoice",
      description: "Comprehensive template for professional service billing",
      route: "/generate/service-invoice"
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 mt-14">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
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
              onClick={() => router.push(template.route)}
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
            onClick={() => router.push('/generate/scratch')}
          >
            <Plus className="mr-2" /> Start from Scratch
          </Button>
        </div>
      </motion.div>
    </div>
  );
}