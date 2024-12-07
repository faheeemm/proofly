"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"; // Use the useToast hook for toast functionality

export default function ContactPage() {
  const [countdown, setCountdown] = useState(3); // Set initial countdown to 3 seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    receiptNumber: "",
    message: "",
  });
  const { toast } = useToast(); // Get the toast function from the hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if required fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      if (!formData.name) {
        toast({
          title: "Please fill in your name",
          variant: "destructive", // Use the destructive variant for red toast
        });
      }
      if (!formData.email) {
        toast({
          title: "Please fill in your email",
          variant: "destructive",
        });
      }
      if (!formData.message) {
        toast({
          title: "Please fill in your message",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
      return;
    }

    // Send the form data to the API route
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Display success toast with countdown
      toast({
        title: "Form Submitted",
        description: (
          <>
            Redirecting in {countdown}s.{" "}
            <a
              href="/"
              className="underline text-white"
              onClick={(e) => {
                e.preventDefault(); // Prevent automatic redirection
                window.location.href = "/";
              }}
            >
              Click here
            </a>
            {" to go back."}
          </>
        ),
        variant: "success", // Use the success variant for green toast
        className: "bg-green-700", // Darker green background
      });

      // Start the countdown
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            // Redirect after countdown finishes
            window.location.href = "/"; // Redirect to the home page
          }
          return prev - 1;
        });
      }, 1000); // Countdown interval (1 second)

    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or feedback related to your receipt? Let us know!
        </p>
        {isSubmitting && (
          <p className="mt-2 text-lg text-muted-foreground">
            Click here to go back to the home page, or you will be redirected in {countdown}s.
          </p>
        )}
      </div>
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-[400px] border rounded-lg p-6 shadow-sm bg-card">
          <div className="space-y-4">
            <Input
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              placeholder="Enter your receipt number"
              name="receiptNumber"
              value={formData.receiptNumber}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Write your message or issue with receipt"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <Button className="mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
