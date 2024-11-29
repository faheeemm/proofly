"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInWithEmailAndPassword, sendSignInLinkToEmail, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });

      // Redirect to dashboard
      router.push('/dashboard');
      
      // Fallback redirection
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);

    } catch (error) {
      const firebaseError = error as { code?: string, message?: string };
      
      // More specific error handling
      let errorMessage = "Invalid email or password";
      switch (firebaseError.code) {
        case 'auth/invalid-credential':
          errorMessage = "Invalid email or password";
          break;
        case 'auth/user-disabled':
          errorMessage = "This account has been disabled";
          break;
        case 'auth/user-not-found':
          errorMessage = "No user found with this email";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password";
          break;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      console.error("Login error:", {
        code: firebaseError.code,
        message: firebaseError.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (email: string) => {
    try {
      setIsLoading(true);
      const actionCodeSettings = {
        url: window.location.origin + '/dashboard',
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      toast({
        title: "Magic Link Sent",
        description: "Check your email for the login link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send magic link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
      setShowForgotPassword(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send reset email. Please try again.",
        variant: "destructive",
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
          <h2 className="text-2xl font-bold">Welcome back</h2>
        </div>

        {!showForgotPassword ? (
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
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as HTMLFormElement).email.value;
            handleForgotPassword(email);
          }} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            onClick={() => {
              const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value;
              if (email) handleMagicLink(email);
            }}
            disabled={isLoading}
          >
            Sign in with Magic Link
          </Button>
          <Button
            variant="link"
            onClick={() => setShowForgotPassword(!showForgotPassword)}
          >
            {showForgotPassword ? "Back to Login" : "Forgot Password?"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}