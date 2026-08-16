"use client";

import React, { useRef, useState, useEffect } from "react";
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
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

/**
 * Animates a numeric string (e.g. "4", "8") from 0 to the target when
 * the element enters the viewport. Non-numeric values are returned as-is.
 */
function useCountUp(target: string, duration = 1200) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  // Extract the numeric part and any trailing suffix ("1yr+" → num=1, suffix="yr+")
  const match = target.match(/^([0-9]+)(.*)$/);
  const numericValue = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (numericValue === null) {
      setDisplay(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericValue);
            setDisplay(`${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [numericValue, suffix, duration, target]);

  return { display, ref };
}

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

// Separate component so each card gets its own useCountUp hook instance
function StatCard({
  stat,
  StatIcon,
}: {
  stat: { value: string; label: string; sub: string };
  StatIcon: React.ElementType;
}) {
  const { display, ref } = useCountUp(stat.value, 1400);

  return (
    <SpotlightCard
      spotlightRgb={ACCENT_RGB}
      className="group h-full rounded-2xl border border-white/10 bg-[#080808] p-5 sm:p-6 justify-between hover:border-[#ccff00]/30 transition-all duration-300"
    >
      {/* Large faint watermark icon */}
      <StatIcon
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 w-20 h-20"
        style={{ color: `${ACCENT}0D` }}
      />

      <div
        className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative z-10"
        style={{ color: ACCENT }}
      >
        <StatIcon className="w-4 h-4" />
      </div>

      <div className="relative z-10" ref={ref}>
        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
          {display}
        </div>
        <div className="text-xs font-semibold text-gray-200 mt-1">{stat.label}</div>
        <div className="text-[11px] font-mono text-gray-500 mt-0.5">{stat.sub}</div>
      </div>
    </SpotlightCard>
  );
}


export default function About() {
  return (
    <section id="about" className="relative py-24 bg-black overflow-hidden">
      {/* Drifting ambient glow */}
      <motion.div
        className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{ background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)` }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_transparent_60%)]" />

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
            className="lg:col-span-7"
          >
            <SpotlightCard
              spotlightRgb={ACCENT_RGB}
              className="h-full rounded-3xl border border-white/10 bg-[#080808] p-6 sm:p-8 justify-between hover:border-[#ccff00]/30 transition-all duration-300"
            >
              {/* Oversized watermark quote mark */}
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -top-6 right-4 text-[9rem] font-black leading-none"
                style={{ color: `${ACCENT}0D` }}
              >
                “
              </span>

              <div className="space-y-4 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Crafting digital experiences with precision and purpose.
                </h3>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {portfolioData.personal.aboutBio}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed">
                  My software engineering journey blends formal Computer Science
                  training with hands-on industry development at{" "}
                  <span className="text-white font-medium">7 Kings Code LLC</span>,
                  where I build enterprise React/Next.js interfaces and Sitecore
                  solutions. I&apos;m driven by the intersection of fast web rendering
                  and modern AI agent capabilities.
                </p>

                {portfolioData.personal.location && (
                  <p className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                    <MapPin className="w-3.5 h-3.5" style={{ color: ACCENT }} />
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
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Connect row — resume + socials */}
              <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/[0.08] relative z-10">
                <a
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide text-black transition-all hover:scale-[1.03] shadow-[0_0_20px_rgba(204,255,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
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
                  className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-gray-300 hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-gray-300 hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </SpotlightCard>
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
                >
                  <StatCard stat={stat} StatIcon={StatIcon} />
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
              >
                <SpotlightCard
                  spotlightRgb={ACCENT_RGB}
                  className="group h-full rounded-2xl border border-white/10 bg-[#080808] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ccff00]/30"
                >
                  {/* Large index number watermark */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 right-4 text-5xl font-black"
                    style={{ color: `${ACCENT}0D` }}
                  >
                    0{idx + 1}
                  </span>

                  <div
                    className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform relative z-10"
                    style={{ color: ACCENT }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 tracking-tight relative z-10">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed relative z-10">
                    {pillar.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}