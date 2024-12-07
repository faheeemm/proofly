"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth"; // Adjust the import path as needed

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth(); // Use the AuthContext

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // If user is already logged in, redirect to dashboard or home
  if (user) {
    router.replace('/docs'); // or wherever you want to redirect logged-in users
    return null;
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // Show success toast
      toast({
        title: "Success",
        description: "Your account has been created successfully. Please log in.",
      });

      // Multiple redirection attempts
      router.push('/docs');
      
      // Fallback redirection
      setTimeout(() => {
        window.location.href = '/docs';
      }, 100);

    } catch (error) {
      const firebaseError = error as { code?: string, message?: string };
      
      // More specific error handling
      let errorMessage = "Could not create account";
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Email is already registered";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Email/password accounts are not enabled";
          break;
        case 'auth/weak-password':
          errorMessage = "Password is too weak";
          break;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      console.error("Signup error:", {
        code: firebaseError.code,
        message: firebaseError.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}