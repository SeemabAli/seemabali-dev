"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Sparkles,
  GraduationCap,
  Layers,
  Cpu,
  Zap,
  CheckCircle,
  MapPin,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { portfolioData } from "@/data/portfolioData";

const ACCENT = "#ccff00";

const PILLARS = [
  {
    icon: Code,
    title: "Modern Web Engineering",
    description:
      "Building fast, maintainable, and type-safe frontends with Next.js App Router, React 19, TypeScript, and Tailwind CSS.",
  },
  {
    icon: Cpu,
    title: "AI Integration & Automation",
    description:
      "Bridging LLMs (OpenAI, LangChain) with robust backend services (FastAPI, Express) for intelligent user workflows.",
  },
  {
    icon: Layers,
    title: "Full-Stack Architecture",
    description:
      "Designing scalable REST APIs, secure authentication flows, and structured MongoDB schemas tailored for growth.",
  },
];

const HIGHLIGHTS = [
  "Pixel-perfect responsive UI",
  "Modern AI API integrations",
  "Scalable REST & microservices",
  "Type-safe TypeScript architecture",
];

const STAT_ICONS = [Layers, Code, GraduationCap, Zap];

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-black overflow-hidden">
      {/* Ambient glow, same restrained treatment as Hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 // About Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Software Engineering Graduate &{" "}
            <span style={{ color: ACCENT }}>Modern Web Developer</span>
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Delivering clean code, responsive architectures, and AI-assisted workflows
            designed for production impact.
          </p>
        </div>

        {/* Narrative & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          {/* Left: Engineering Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Crafting digital experiences with precision and purpose.
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {portfolioData.personal.aboutBio}
              </p>

              <p className="text-gray-400 text-sm leading-relaxed">
                My software engineering journey blends formal Computer Science training
                with hands-on industry development at{" "}
                <span className="text-white font-medium">
                  7 Kings Code Software Solutions
                </span>
                , where I build enterprise React/Next.js interfaces and Sitecore
                solutions. I&apos;m driven by the intersection of fast web rendering and
                modern AI agent capabilities.
              </p>

              {portfolioData.personal.location && (
                <p className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  {portfolioData.personal.location}
                </p>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/[0.08] relative z-10">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-xs text-gray-300 font-medium"
                >
                  <CheckCircle
                    className="w-4 h-4 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Connect row — resume + socials, kept quiet and out of the way */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/[0.08] relative z-10">
              <a
                href={portfolioData.personal.resumeUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide text-black transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ backgroundColor: ACCENT }}
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>

              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-black hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-black hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right: Stat Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {portfolioData.personal.stats.map((stat, idx) => {
              const StatIcon = STAT_ICONS[idx % STAT_ICONS.length];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between hover:border-white/25 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                    style={{ color: ACCENT }}
                  >
                    <StatIcon className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-gray-200 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] font-mono text-gray-500 mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3 Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <div
                  className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform"
                  style={{ color: ACCENT }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="text-base font-bold text-white mb-2 tracking-tight">
                  {pillar.title}
                </h4>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}