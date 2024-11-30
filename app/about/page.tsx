  "use client";

  import { motion } from "framer-motion";
  import { useState, useEffect, useRef } from "react";
  import { ArrowRight, Linkedin, Github } from "lucide-react";

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

    type MemberLinks = {
      [key: string]: {
        linkedin: string;
        github: string;
      };
    };

    const memberLinks: MemberLinks = {
      "Mohammed Ufraan": {
        linkedin: "https://www.linkedin.com/in/ufraaan/",
        github: "https://github.com/moroii69"
      },
      "Faheem Ahmed": {
        linkedin: "https://www.linkedin.com/in/faheeem/",
        github: "https://github.com/faheemahm"
      },
      "Mohd Abrar": {
        linkedin: "https://www.linkedin.com/in/shaik-mohd-abrar-019812294/",
        github: "https://github.com/Abrarr12"
      },
      "Abdul Raqueeb": {
        linkedin: "https://www.linkedin.com/in/mohammed-abdul-raqueeb-895abb327/",
        github: "https://github.com/abdul-raqueeb"
      }
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
            {[
              { name: "Mohammed Ufraan", role: "Project Lead & Full-Stack Developer", img: "https://i.imgur.com/wPdloI2.jpeg" },
              { name: "Faheem Ahmed", role: "Frontend Developer & Backend Engineer", img: "https://i.imgur.com/kPbPY1W.jpeg" },
              { name: "Mohd Abrar", role: "Backend Developer & Quality Assurance Specialist", img: "https://i.imgur.com/Nm7NbDF.jpeg" },
              { name: "Abdul Raqueeb", role: "Backend Developer & Quality Assurance Specialist", img: "https://i.imgur.com/fgEZbMd.jpeg" }
            ].map((member) => (
              <div key={member.name} className="border rounded-lg p-8 shadow-lg bg-card">
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full mb-6">
                    <img 
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-2xl font-semibold">{member.name}</h4>
                  <p className="text-md text-muted-foreground">{member.role}</p>
                  <div className="flex space-x-4 mt-4">
                    <a 
                      href={memberLinks[member.name].linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a 
                      href={memberLinks[member.name].github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-gray-600 transition-colors"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }