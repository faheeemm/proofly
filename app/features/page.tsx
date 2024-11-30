"use client";

import { motion } from "framer-motion";
import { FileText, Lock, Globe, Mail } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: FileText,
      title: "Receipt Generation",
      description: "Create professional invoices and receipts with automatic calculations and tax handling.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description: "Your data is encrypted and securely stored with enterprise-grade security.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "Currency Support",
      description: "Generate receipts in multiple currencies with real-time conversion rates.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Mail,
      title: "Email Integration",
      description: "Send receipts directly to customers via email with customizable templates.",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      {/* Features Header */}
      <div className="text-center mt-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        What We Offer
        </h2>
        <p className="mt-1 text-lg text-muted-foreground max-w-2xl mx-auto">
          Seamless features designed to enhance your receipt and invoice management
        </p>
      </div>

      {/* Features Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border rounded-lg p-8 shadow-lg bg-card transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center bg-gradient-to-r ${feature.color}`}
              >
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-semibold mb-4">{feature.title}</h4>
              <p className="text-md text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
