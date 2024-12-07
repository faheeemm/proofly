"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Download, 
  Settings, 
  Rocket, 
  Users, 
  Star,
  Code 
} from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Docs: FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof tabContent>("overview");
    const { theme, setTheme } = useTheme();
  
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = '/downloads/proofly-generator.rar';
      link.download = 'proofly-generator.rar';
      link.click();
    };

  const tabIcons = {
    overview: BookOpen,
    setup: Settings,
    features: Rocket,
    ux: Star,
    future: Rocket,
    contributing: Users,
    sourceCode: Code
  };

  const tabContent: { [key in 'overview' | 'setup' | 'features' | 'ux' | 'future' | 'contributing' | 'sourceCode']: JSX.Element } = {
    overview: (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gradient text-2xl">Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-gray-300">
            A powerful financial documentation tool designed to generate professional receipts, 
            invoices, and bills with automated precision and user-friendly interface.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Purpose</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                Automate financial document generation with ease and professionalism.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Vision</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                Simplify financial record-keeping through intelligent automation.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Approach</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                Minimalistic design with powerful document generation capabilities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
    setup: (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gradient text-2xl">Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
              <h3 className="text-yellow-700 dark:text-yellow-400 font-semibold mb-2">Download Package</h3>
              <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-3">
                Download the complete project package containing all necessary files.
              </p>
              <Button 
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Project (.rar)
              </Button>
            </div>

            <ol className="list-decimal list-inside text-muted-foreground dark:text-gray-300 space-y-2">
              <li>Extract the downloaded .rar file to your desired project directory</li>
              <li>Open the extracted folder in your preferred IDE or terminal</li>
              <li>Install required libraries using the following command:
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 text-sm text-black dark:text-white">
                  pip install customtkinter docxtpl datetime tkinter
                </pre>
              </li>
              <li>Import required libraries in your project:
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 text-sm text-black dark:text-white">
                  {`import customtkinter as ctk
from docxtpl import DocxTemplate
import datetime
import os
from tkinter import messagebox
from tkinter import ttk`}
                </pre>
              </li>
              <li>Run the application by executing:
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 text-sm text-black dark:text-white">
                  python main.py
                </pre>
              </li>
            </ol>

            <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-green-700 dark:text-green-400 text-sm">
                🎉 Pro Tip: Ensure you have Python 3.7+ installed before proceeding
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
    features: (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gradient text-2xl">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Dynamic Document Generation", description: "Create professional receipts with automated calculations" },
              { title: "Template Customization", description: "Flexible templates for various document types" },
              { title: "Multi-Format Export", description: "Export to DOCX, PDF with single click" },
              { title: "Data Persistence", description: "Save and retrieve document information" },
              { title: "User-Friendly Interface", description: "Intuitive GUI with CustomTkinter" },
              { title: "Error Handling", description: "Robust validation and user feedback mechanisms" }
            ].map(feature => (
              <div 
                key={feature.title} 
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ),
    ux: (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gradient text-2xl">UI/UX Philosophy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Star className="text-blue-500 dark:text-blue-400" />
              <span className="font-semibold dark:text-white">Simplistic Design</span>
            </div>
            <p className="text-muted-foreground dark:text-gray-300">
              Intuitive interface that prioritizes user efficiency and clarity.
            </p>
            <Separator className="dark:bg-gray-700" />
            <div className="flex items-center space-x-3">
              <Star className="text-green-500 dark:text-green-400" />
              <span className="font-semibold dark:text-white">Streamlined Workflow</span>
            </div>
            <p className="text-muted-foreground dark:text-gray-300">
              Minimal steps to generate professional financial documents.
            </p>
            <Separator className="dark:bg-gray-700" />
            <div className="flex items-center space-x-3">
              <Star className="text-purple-500 dark:text-purple-400" />
              <span className="font-semibold dark:text-white">Accessibility Focus</span>
            </div>
            <p className="text-muted-foreground dark:text-gray-300">
              Clear typography and touch-friendly design for all users.
            </p>
          </div>
        </CardContent>
      </Card>
    ),
    future: (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gradient text-2xl">Roadmap & Future Innovations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Cloud Sync Capabilities",
              "Advanced Reporting Tools",
              "Multi-Language Support",
              "Machine Learning Insights",
              "Enhanced Template Editor",
              "API Integration"
            ].map(feature => (
              <div 
                key={feature} 
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-2">
                  <Rocket className="text-blue-500 dark:text-blue-400 w-5 h-5" />
                  <span className="font-medium text-muted-foreground dark:text-gray-300">{feature}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">Community-Driven Development</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              Our roadmap is continuously shaped by user feedback and emerging technology trends.
            </p>
          </div>
        </CardContent>
      </Card>
    ),
    contributing: (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gradient text-2xl">Contributor Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <Users className="text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-800 dark:text-green-400">Open Source Community</span>
            </div>
            <ol className="list-decimal list-inside text-muted-foreground dark:text-gray-300 space-y-2">
              <li>Clone and fork the repository</li>
              <li>Create a descriptive branch</li>
              <li>Implement and thoroughly test changes</li>
              <li>Submit a detailed pull request</li>
              <li>Engage in constructive code review</li>
            </ol>
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                🌟 Every contribution helps improve our project!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
    sourceCode: (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gradient text-2xl">Source Code Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">GitHub Repository</h3>
              <p className="text-muted-foreground dark:text-gray-300 mb-4">
                Access the full source code, report issues, and contribute to the project.
              </p>
              <Button 
                variant="outline" 
                className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                onClick={() => window.open('https://github.com/moroii69/proofly', '_blank')}
              >
                <Code className="mr-2 h-5 w-5" />
                View Source Code
              </Button>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-green-600 dark:text-green-400 font-semibold mb-2">Repository Structure</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm text-black dark:text-white">
                {`───app
│   ├───about
│   ├───contact
│   ├───dashboard
│   │   ├───analytics
│   │   ├───receipts
│   │   │   └───components
│   │   └───settings
│   ├───docs
│   ├───generate
│   │   ├───business-expense
│   │   ├───dining-invoice
│   │   └───scratch
│   ├───how-it-works
│   ├───login
│   ├───pricing
│   ├───privacy
│   ├───signup
│   └───terms
├───components
│   └───ui
├───hooks
├───lib`}
              </pre>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">Contribution Guidelines</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Please read our CONTRIBUTING.md for detailed guidelines on how to contribute to the project.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="w-72 bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700 p-6 fixed top-0 left-0 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gradient">Documentation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <nav className="space-y-2">
          {(Object.keys(tabContent) as Array<keyof typeof tabContent>).map(tab => {
            const Icon = tabIcons[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3
                  ${activeTab === tab 
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold" 
                    : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700"}
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="capitalize">{tab.replace(/([A-Z])/g, ' $1')}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <main className="flex-1 ml-72 p-12 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </main>
    </div>
  );
};

export default Docs;