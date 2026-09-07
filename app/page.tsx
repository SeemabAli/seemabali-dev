"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import LighthouseBadge from "@/components/LighthouseBadge";
import CodeScryShowcase from "@/components/CodeScryShowcase";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import MatrixBackground from "@/components/MatrixBackground";

export default function PortfolioPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const openChat = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      {/* Loading Screen — sits on top until portfolio is fully loaded */}
      <AnimatePresence>
        {!isLoaded && (
          <LoadingScreen onDone={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Portfolio — fades in once loading is done */}
      <AnimatePresence>
        {isLoaded && (
          <motion.main
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200"
          >
            {/* Live Subtle Matrix Background Stream */}
            <MatrixBackground />

            {/* Scroll progress bar */}
            <ScrollProgress />

            {/* Sticky Glass Navbar */}
            <Navbar />

            {/* Hero Section */}
            <Hero onOpenChat={openChat} />

            {/* About Section with Stats */}
            <About />

            {/* Chrome DevTools Lighthouse Score Badges */}
            <LighthouseBadge />

            {/* Skills & Tech Stack Section */}
            <Skills />

            {/* Projects Showcase Section */}
            <Projects />

            {/* CodeScry AI Flagship Architecture Deep Dive */}
            <CodeScryShowcase />

            {/* Experience Timeline Section */}
            <Experience />

            {/* Certifications Section */}
            <Certifications />

            {/* Education Section */}
            <Education />

            {/* Contact Section */}
            <Contact onOpenChat={openChat} />

            {/* Footer */}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Dynamic Gemini API Chatbot (Fixed Viewport Layer) */}
      {isLoaded && (
        <AIChatbot isOpen={isChatOpen} onToggle={toggleChat} />
      )}
    </>
  );
}
