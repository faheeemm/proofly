"use client";

import { motion } from "framer-motion";
import { FileText, Lock, Globe, Check, Clock, Share, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: FileText,
      title: "Create Your Receipt",
      description: "Start by inputting your business and transaction details. Our intuitive interface guides you through each step, making receipt creation simple and efficient.",
    },
    {
      icon: Lock,
      title: "Secure Data Entry",
      description: "Enter your financial information with confidence. Our platform uses end-to-end encryption to protect your sensitive data from the moment you start.",
    },
    {
      icon: Globe,
      title: "Multi-Currency Conversion",
      description: "Automatically convert currencies in real-time. Whether you're dealing with local or international transactions, we handle the math for you.",
    },
    {
      icon: Check,
      title: "Review and Validate",
      description: "Double-check all details with our smart validation system. Catch potential errors before finalizing your receipt, ensuring accuracy every time.",
    },
    {
      icon: Share,
      title: "Send and Store",
      description: "Instantly email receipts to clients or save them securely in our cloud storage. Access your financial documents anytime, anywhere.",
    },
    {
      icon: Clock,
      title: "Track and Manage",
      description: "Monitor your financial documents with comprehensive tracking. Generate reports, analyze spending, and keep your financial records organized.",
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A seamless journey from receipt creation to financial management
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto mt-16">
        {/* Vertical Timeline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-200 h-full" />
        
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className={`mb-12 flex items-center ${
              index % 2 === 0 ? 'flex-row-reverse' : ''
            } w-full`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Timeline Marker */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center z-10">
              <span className="text-blue-500 font-bold">{index + 1}</span>
            </div>

            {/* Card */}
            <div 
              className={`w-[calc(50%-60px)] border rounded-lg p-6 shadow-sm bg-card ${
                index % 2 === 0 ? 'ml-auto mr-0' : 'mr-auto ml-0'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Documentation Section */}
      <div className="mt-16 text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
          System Documentation
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "API Integration",
              description: "Our robust API allows seamless integration with existing accounting and business management systems. Support for REST and GraphQL endpoints ensures flexibility for different technical environments.",
            },
            {
              title: "Security Compliance",
              description: "Fully compliant with GDPR, SOC 2, and PCI DSS standards. We implement multi-factor authentication, end-to-end encryption, and regular security audits to protect your financial data.",
            },
            {
              title: "Data Retention",
              description: "Receipts and financial documents are stored securely for 7 years, in compliance with international accounting regulations. Easy export and archiving options are available.",
            },
            {
              title: "Performance",
              description: "Optimized for speed with sub-second receipt generation and processing. Scalable infrastructure supports businesses of all sizes, from small startups to enterprise-level organizations.",
            }
          ].map((doc, idx) => (
            <motion.div
              key={doc.title}
              className="border rounded-lg p-6 shadow-sm bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <ChevronRight className="mr-2 text-blue-500" /> 
                {doc.title}
              </h4>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Button>Get Started</Button>
      </div>
    </div>
  );
}