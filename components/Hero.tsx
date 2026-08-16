"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import centerImage from "../public/Images/portfolioImage2.png";

interface HeroProps {
  onPreloadComplete?: () => void;
  onOpenChat?: () => void;
}

const START_WORD = "SEEMAB";
const TARGET_WORD = "PORTFOLIO";
const ACCENT = "#ccff00";

function splitRole(role: string): [string, string] {
  const [first, ...rest] = role.trim().split(" ");
  return [first, rest.join(" ") || ""];
}

const Hero: React.FC<HeroProps> = ({ onPreloadComplete, onOpenChat }) => {
  const [text, setText] = useState(START_WORD);

  const [roleBold, roleItalic] = splitRole(
    portfolioData.personal.role ?? "Software Developer"
  );

  // Smooth, non-blocking letter morph using requestAnimationFrame
  useEffect(() => {
    let frameId: number;
    let start: number | null = null;
    const duration = 650; // ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const revealedLength = Math.floor(progress * TARGET_WORD.length);

      const newText = TARGET_WORD.split("")
        .map((letter, i) => {
          if (i < revealedLength) return TARGET_WORD[i];
          if (i < START_WORD.length) return START_WORD[i];
          return "";
        })
        .join("");

      setText(newText);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        onPreloadComplete?.();
      }
    };

    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(step);
    }, 200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [onPreloadComplete]);

  const handleScrollCueClick = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative h-[100dvh] min-h-[580px] flex items-end justify-center bg-transparent overflow-hidden select-none"
    >
      {/* Ambient background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* 1. PORTFOLIO Wordmark in the EXACT Center of the Hero Section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full pointer-events-none flex items-center justify-center px-2">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-[17vw] sm:text-[15vw] md:text-[12rem] lg:text-[15rem] xl:text-[17rem] font-black tracking-tighter text-transparent bg-clip-text drop-shadow-[0_15px_45px_rgba(0,0,0,0.9)] leading-none uppercase text-center select-none"
          style={{
            backgroundImage: `linear-gradient(105deg, #374151 0%, #d1d5db 28%, ${ACCENT} 50%, #d1d5db 72%, #374151 100%)`,
            backgroundSize: "220% 100%",
          }}
        >
          {text}
        </motion.h1>
      </div>

      {/* 2. Portrait Graphic: Starts under the navbar and ends cleanly at hero bottom */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full h-[calc(100dvh-4.5rem)] sm:h-[calc(100dvh-5rem)] flex items-end justify-center pointer-events-none"
      >
        {/* Sweeping Neon Glow Behind Portrait */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 z-0 w-72 sm:w-[480px] md:w-[600px] aspect-square rounded-full blur-2xl sm:blur-3xl opacity-50 sm:opacity-60 pointer-events-none transform-gpu"
          style={{
            background: `radial-gradient(circle, ${ACCENT}85 0%, ${ACCENT}25 45%, transparent 75%)`,
          }}
        />

        {/* Large Portrait Image Spanning Below Navbar to Hero Bottom */}
        <div className="relative z-10 w-full h-full max-w-[320px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[660px] flex items-end justify-center">
          <Image
            src={centerImage}
            alt="Seemab Ali - Full-Stack Developer"
            priority={true}
            fetchPriority="high"
            quality={90}
            sizes="(max-width: 640px) 320px, (max-width: 768px) 460px, (max-width: 1024px) 560px, 660px"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] filter contrast-[1.03]"
          />
        </div>
      </motion.div>

      {/* 3. Mobile Header (Seemab Ali + Role & CTA under navbar) */}
      <div className="md:hidden absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center gap-2 pointer-events-auto w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm font-bold text-white tracking-tight">{portfolioData.personal.name}</span>
          <span className="text-xs text-gray-300">
            {roleBold} <span className="italic" style={{ color: ACCENT }}>{roleItalic}</span>
          </span>
        </motion.div>

        {onOpenChat && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            type="button"
            onClick={onOpenChat}
            className="mt-0.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-black font-bold text-[11px] tracking-wide shadow-[0_0_20px_rgba(204,255,0,0.4)] active:scale-95 transition-transform"
            style={{ backgroundColor: ACCENT }}
          >
            <Sparkles className="w-3 h-3" />
            <span>Ask AI About Me</span>
          </motion.button>
        )}
      </div>

      {/* 4. Desktop / Tablet Details (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex absolute bottom-8 lg:bottom-10 left-6 lg:left-12 z-20 flex-col items-start gap-1 pointer-events-auto"
      >
        <h2 className="text-2xl lg:text-3xl text-white font-black tracking-tight drop-shadow-md">
          {portfolioData.personal.name}
        </h2>
        <p className="text-sm lg:text-base font-medium text-gray-300 drop-shadow-md">
          <span className="font-bold text-white">{roleBold}</span>{" "}
          <span className="font-light italic" style={{ color: ACCENT }}>{roleItalic}</span>
        </p>
      </motion.div>

      {/* 5. Desktop / Tablet "Ask AI About Me" CTA (Bottom Right) */}
      {onOpenChat && (
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute bottom-8 lg:bottom-10 right-6 lg:right-12 z-20 pointer-events-auto"
        >
          <button
            type="button"
            onClick={onOpenChat}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-black font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(204,255,0,0.35)] hover:shadow-[0_0_40px_rgba(204,255,0,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            style={{ backgroundColor: ACCENT }}
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            <span>Ask AI About Me</span>
          </button>
        </motion.div>
      )}

      {/* 6. Centered Scroll Down Cue (Bottom Center) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onClick={handleScrollCueClick}
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 cursor-pointer group pointer-events-auto"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-400 group-hover:text-white transition-colors">
          Scroll
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce transition-transform group-hover:translate-y-0.5"
          style={{ color: ACCENT }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;