"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Receipt, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image"; 
import { useTheme } from "next-themes"; 

export function Navbar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme(); 
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isMounted) return null;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-0.1">
          <Image 
            src={theme === "dark" ? "https://i.imgur.com/ZEC13Py.png" : "https://i.imgur.com/CfszNeV.png"} 
            width={50} 
            height={50} 
            alt="Proofly Logo" 
          />
          <span className="font-bold">Proofly</span>
        </Link>

        <div className="flex-1" />
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-muted-foreground"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/how-it-works" className="text-sm font-medium">
            How it works
          </Link>
          <Link href="/pricing" className="text-sm font-medium">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <ThemeToggle />
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Dimmed Background */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background border-l transform transition-transform z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-muted-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-start space-y-4 p-4">
          <Link href="/Features" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
            How it Works
          </Link>
          <Link href="/pricing" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <ThemeToggle />
          {user ? (
            <>
              <Button variant="ghost" asChild onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild onClick={() => setMenuOpen(false)}>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild onClick={() => setMenuOpen(false)}>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
