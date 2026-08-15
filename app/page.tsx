"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

export default function PortfolioPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const openChat = () => {
    setIsChatOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero onOpenChat={openChat} />

      {/* About Section with Stats */}
      <About />

      {/* Skills & Tech Stack Section */}
      <Skills />

      {/* Projects Showcase Section */}
      <Projects />

      {/* Experience Timeline Section */}
      <Experience />

      {/* Education Section */}
      <Education />

      {/* Contact Section */}
      <Contact onOpenChat={openChat} />

      {/* Footer */}
      <Footer />

      {/* Interactive AI Chatbot */}
      <AIChatbot isOpen={isChatOpen} onToggle={toggleChat} />
    </main>
  );
}
