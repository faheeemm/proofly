"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Terms of Service
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Please review our terms and conditions
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
            Welcome to Our Service
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            By accessing or using our service, you agree to be bound by these
            terms of service and our privacy policy. If you do not agree with
            these terms, please do not use our service.
          </p>
          <h3 className="mt-6 text-lg font-semibold leading-8">
            User Responsibilities
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            You are responsible for maintaining the confidentiality of your
            account and password, and for restricting access to your computer.
            You agree to be responsible for all activities that occur under your
            account or password.
          </p>
          <h3 className="mt-6 text-lg font-semibold leading-8">
            Intellectual Property
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Our service and its original content, features, and functionality are
            owned by our company and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property or
            proprietary rights laws.
          </p>
          <h3 className="mt-6 text-lg font-semibold leading-8">
            Termination
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            We reserve the right to terminate or suspend your access to our
            service immediately, without prior notice or liability, for any
            reason whatsoever, including if we reasonably believe that you have
            violated these terms.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
