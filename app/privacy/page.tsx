"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Privacy Policy
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Understand how we prioritize and protect your privacy.
        </p>
      </div>
      <motion.div 
        className="mt-8 flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-[800px] border rounded-lg p-6 shadow-sm bg-card">
          <h3 className="text-lg font-semibold leading-8">
            Our Commitment to Privacy
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            We are committed to maintaining the privacy and security of your personal data. Protecting your privacy is a top priority, and we take extensive measures to ensure your information is secure.
          </p>
          <h3 className="mt-6 text-lg font-semibold leading-8">
            Information We Collect
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            We may collect certain information, such as your name, email address, and usage patterns, to deliver our services effectively and enhance your experience. Rest assured, we do not share or sell your personal data to third parties without your explicit consent, unless mandated by law.
          </p>
          <h3 className="mt-6 text-lg font-semibold leading-8">
            Your Rights and Control Over Your Data
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            You have full control over your personal information. You can access, update, or request deletion of your data at any time. Additionally, you can opt-out of specific data collection and marketing activities. For any questions or concerns, our support team is always available to assist you.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
