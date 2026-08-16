"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { portfolioData, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

const lineContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const projects = portfolioData.projects;

  const rafRef = useRef<number | null>(null);

  const updateScrollState = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollPrev(scrollLeft > 15);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 15);

      const cards = carouselRef.current.querySelectorAll<HTMLElement>("[data-project-card]");
      if (cards.length > 0) {
        let closestIndex = 0;
        let minDistance = Infinity;
        const containerLeft = carouselRef.current.getBoundingClientRect().left;

        cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.left - containerLeft);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });
        setActiveIndex(closestIndex);
      }
    });
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("resize", updateScrollState);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll<HTMLElement>("[data-project-card]");
    const targetCard = cards[index];
    if (targetCard) {
      const container = carouselRef.current;
      const targetLeft = targetCard.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll<HTMLElement>("[data-project-card]");
    const cardWidth = cards[0]?.offsetWidth ?? 360;
    carouselRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
  };

  const handleNext = () => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll<HTMLElement>("[data-project-card]");
    const cardWidth = cards[0]?.offsetWidth ?? 360;
    carouselRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
  };

  // Live-typing terminal mockups, monochrome + lime, one per project id.
  const renderProjectVisual = (project: Project) => {
    const lines: { text: string; tone?: string }[] =
      project.id === "codescry-ai"
        ? [
          { text: "✓ AST Parser: 42 files scanned" },
          { text: "✓ Security Audit: 0 High Vulnerabilities" },
          { text: "⚡ AI code smell detected in auth_controller.ts" },
          { text: "➔ Generating auto-fix patch via GPT-4o-mini..." },
        ]
        : project.id === "lecture-timetable-system"
          ? [
            { text: "Mon 09:00  →  CS-401 (Room 3A)" },
            { text: "Mon 11:30  →  SE-302 (Lab 2)" },
            { text: "Tue 14:00  →  AI-505 (Hall B)" },
            { text: "✓ 0 room or instructor conflicts detected" },
          ]
          : project.id === "attendance-management-system"
            ? [
              { text: "Department Attendance ....... 96.4% overall" },
              { text: "Active Members ............... 120+" },
              { text: "Leave Approvals ............... 100%" },
              { text: "✓ Monthly PDF / CSV export ready" },
            ]
            : project.id === "bari-arabians"
              ? [
                { text: "✓ PostgreSQL DB: 10+ Stud records loaded" },
                { text: "✓ Prisma ORM: Pedigree relations active" },
                { text: "⚡ Next.js App Router: Dynamic horse profile" },
                { text: "✓ Specification & lineage sheets ready" },
              ]
              : project.features.slice(0, 4).map((feat) => ({ text: `✓ ${feat}` }));

    const tag =
      project.id === "codescry-ai"
        ? "codescry-engine // v2.4"
        : project.id === "lecture-timetable-system"
          ? "timetable-solver // constraint-engine"
          : project.id === "attendance-management-system"
            ? "attendance-analytics // mern"
            : project.id === "bari-arabians"
              ? "bari-stud // prisma-postgres"
              : `${project.id} // ${project.technologies[0]?.toLowerCase() ?? "stack"}`;

    return (
      <div className="w-full h-48 sm:h-52 bg-black p-4 flex flex-col justify-between font-mono text-xs relative overflow-hidden border-b border-white/[0.08]">
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-2xl pointer-events-none"
          style={{ background: `${ACCENT}14` }}
        />

        <div className="flex items-center justify-between border-b border-white/5 pb-2 relative z-10">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: ACCENT }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse [animation-delay:0.2s]"
              style={{ backgroundColor: ACCENT, opacity: 0.7 }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse [animation-delay:0.4s]"
              style={{ backgroundColor: ACCENT, opacity: 0.45 }}
            />
            <span className="text-[11px] text-gray-500 ml-2">{tag}</span>
          </div>
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: ACCENT }}
            aria-hidden="true"
          />
        </div>

        <motion.div
          variants={lineContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-1.5 text-[11px] text-gray-300 py-2 relative z-10"
        >
          {lines.map((line, i) => (
            <motion.p key={i} variants={lineVariants}>
              {line.text}
              {i === lines.length - 1 && (
                <span
                  className="inline-block w-1.5 h-3 ml-1 align-middle animate-pulse"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden="true"
                />
              )}
            </motion.p>
          ))}
        </motion.div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-gray-500 relative z-10">
          <span>{project.technologies[0]} Runtime</span>
          <span className="font-bold" style={{ color: ACCENT }}>
            {project.metrics?.[0]?.value ?? "Live"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 relative bg-black overflow-hidden">
      {/* Drifting ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Controls (Centered) */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 // Featured Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Engineered Projects & <span style={{ color: ACCENT }}>Full-Stack Solutions</span>
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Real-world production systems highlighting automated code intelligence, academic
            resource allocation algorithms, and full-stack enterprise portals.
          </p>

          {/* Navigation Controls (Prev / Next & Counter) Centered */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-xs font-mono text-gray-400 flex items-center gap-1.5 shadow-inner">
              <Layers className="w-3.5 h-3.5" style={{ color: ACCENT }} />
              <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={!canScrollPrev}
                aria-label="Previous project"
                className="p-2.5 sm:p-3 rounded-2xl bg-[#0a0a0a] border border-white/10 text-white transition-all duration-200 hover:bg-[#ccff00]/10 hover:border-[#ccff00]/50 hover:text-[#ccff00] disabled:opacity-25 disabled:hover:bg-[#0a0a0a] disabled:hover:border-white/10 disabled:hover:text-white disabled:cursor-not-allowed active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canScrollNext}
                aria-label="Next project"
                className="p-2.5 sm:p-3 rounded-2xl bg-[#0a0a0a] border border-white/10 text-white transition-all duration-200 hover:bg-[#ccff00]/10 hover:border-[#ccff00]/50 hover:text-[#ccff00] disabled:opacity-25 disabled:hover:bg-[#0a0a0a] disabled:hover:border-white/10 disabled:hover:text-white disabled:cursor-not-allowed active:scale-95"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards Slider */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          {/* Subtle edge fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-black to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-black to-transparent z-20" />

          <div
            ref={carouselRef}
            onScroll={updateScrollState}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-4 sm:px-6 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain touch-pan-y"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                data-project-card
                className="snap-center sm:snap-start relative rounded-3xl w-[84vw] max-w-[360px] sm:w-[350px] lg:w-[385px] shrink-0 flex flex-col"
              >
                {/* Rotating gradient ring for featured projects */}
                {project.featured && (
                  <div className="absolute -inset-[1.5px] rounded-3xl overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute -inset-[50%]"
                      style={{
                        background: `conic-gradient(from 0deg, transparent 0%, ${ACCENT} 12%, transparent 26%)`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}

                <SpotlightCard
                  spotlightRgb={ACCENT_RGB}
                  className="relative rounded-3xl border border-white/10 bg-[#080808] overflow-hidden h-full flex flex-col justify-between"
                >
                  <div className="flex flex-col flex-1">
                    {renderProjectVisual(project)}

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Category & Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-medium" style={{ color: ACCENT }}>
                            {project.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                            {project.badgeText}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1 font-medium line-clamp-1">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Key Features Bullet points */}
                        <div className="space-y-1.5 pt-2">
                          {project.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                              <CheckCircle2
                                className="w-3.5 h-3.5 shrink-0"
                                style={{ color: ACCENT }}
                              />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-4 mt-auto">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-lg bg-white/5 border border-white/[0.08] text-[11px] font-mono text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-2 py-1 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-gray-500">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-6 pb-6 pt-3 mt-auto flex items-center justify-between gap-2 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold flex items-center gap-1.5 transition-colors hover:opacity-80 py-1"
                      style={{ color: ACCENT }}
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title}`}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white hover:text-black text-gray-300 border border-white/10 transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-black transition-transform hover:scale-[1.03]"
                          style={{ backgroundColor: ACCENT }}
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots & Navigation Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to project ${idx + 1}: ${project.title}`}
                className={`transition-all duration-300 rounded-full ${isActive
                    ? "w-8 h-2.5 shadow-[0_0_12px_#ccff00]"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                style={{
                  backgroundColor: isActive ? ACCENT : undefined,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}