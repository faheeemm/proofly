"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const membersRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToMembers = () => {
    membersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full Screen About Section */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center mt-4">
  <div className="max-w-4xl">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      About Us
    </h2>
    <p className="mt-1 text-lg text-muted-foreground max-w-2xl mx-auto">
      We are a team committed to building innovative solutions for businesses of all sizes. Our focus is on delivering cutting-edge technology and services that help streamline operations and drive success.
    </p>
  </div>


        {/* About Us Cards */}


        {showScrollHint && (
          <div 
            onClick={scrollToMembers}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center cursor-pointer"
          >
            <p className="text-sm text-muted-foreground animate-bounce">
              Discover Team Members
            </p>
            <ArrowRight className="h-5 w-5 mx-auto text-muted-foreground rotate-90 animate-pulse" />
          </div>
        )}
      </div>

  {/* Our Project Members Section */}
  <div ref={membersRef} className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 lg:px-12 text-center">
  <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
    Our Project Members
  </h2>
  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
    {/* Member 1 - Mohammed Ufraan */}
    <div className="border rounded-lg p-8 shadow-lg bg-card">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full mb-6">
          <img 
            src="https://i.imgur.com/wPdloI2.jpeg"
            alt="Mohammed Ufraan"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h4 className="text-2xl font-semibold">Mohammed Ufraan</h4>
        <p className="text-md text-muted-foreground">Project Lead & Full-Stack Developer</p>
      </div>
    </div>

    {/* Member 2 - Faheem Ahmed */}
    <div className="border rounded-lg p-8 shadow-lg bg-card">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full mb-6">
          <img 
            src="https://i.imgur.com/kPbPY1W.jpeg"
            alt="Faheem Ahmed"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h4 className="text-2xl font-semibold">Faheem Ahmed</h4>
        <p className="text-md text-muted-foreground">Frontend Developer & Backend Engineer</p>
      </div>
    </div>

    {/* Member 3 - Shaik Mohd Abrar */}
    <div className="border rounded-lg p-8 shadow-lg bg-card">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full mb-6">
          <img 
            src="https://i.imgur.com/Nm7NbDF.jpeg"
            alt="Mohd Abrar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h4 className="text-2xl font-semibold">Mohd Abrar</h4>
        <p className="text-md text-muted-foreground">Backend Developer & Quality Assurance Specialist</p>
      </div>
    </div>

    {/* Member 4 - Mohammed Abdul Raqueeb */}
    <div className="border rounded-lg p-8 shadow-lg bg-card">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full mb-6">
          <img 
            src="https://i.imgur.com/fgEZbMd.jpeg"
            alt="Abdul Raqueeb"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h4 className="text-2xl font-semibold">Abdul Raqueeb</h4>
        <p className="text-md text-muted-foreground">Backend Developer & Quality Assurance Specialist</p>
      </div>
    </div>
  </div>
</div>

    </div>

  );
}
