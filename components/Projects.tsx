"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { GithubIcon } from "@/components/icons/SocialIcons";
import { portfolioData, type Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

/**
 * Framer Motion variants
 * Explicitly typed to prevent TypeScript from
 * treating `ease` as a generic string.
 */
const lineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  /**
   * Project terminal visual
   */
  const renderProjectVisual = (project: Project) => {
    const lines: { text: string; tone?: string }[] =
      project.id === "codescry-ai"
        ? [
          {
            text: "✓ AST Parser: 42 files scanned",
          },
          {
            text: "✓ Security Audit: 0 High Vulnerabilities",
          },
          {
            text: "⚡ AI code smell detected in auth_controller.ts",
          },
          {
            text: "➔ Generating auto-fix patch via GPT-4o-mini...",
          },
        ]
        : project.id === "lecture-timetable-system"
          ? [
            {
              text: "Mon 09:00  →  CS-401 (Room 3A)",
            },
            {
              text: "Mon 11:30  →  SE-302 (Lab 2)",
            },
            {
              text: "Tue 14:00  →  AI-505 (Hall B)",
            },
            {
              text: "✓ 0 room or instructor conflicts detected",
            },
          ]
          : [
            {
              text: "Department Attendance ....... 96.4% overall",
            },
            {
              text: "Active Members ............... 120+",
            },
            {
              text: "Leave Approvals ............... 100%",
            },
            {
              text: "✓ Monthly PDF / CSV export ready",
            },
          ];

    const tag =
      project.id === "codescry-ai"
        ? "codescry-engine // v2.4"
        : project.id === "lecture-timetable-system"
          ? "timetable-solver // constraint-engine"
          : "attendance-analytics // mern";

    return (
      <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden border-b border-white/[0.08] bg-black p-4 font-mono text-xs sm:h-56">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-2xl"
          style={{
            background: `${ACCENT}14`,
          }}
        />

        {/* Terminal header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />

            <span className="ml-2 text-[11px] text-gray-500">
              {tag}
            </span>
          </div>

          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{
              backgroundColor: ACCENT,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Terminal lines */}
        <motion.div
          variants={lineContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="relative z-10 space-y-1.5 py-2 text-[11px] text-gray-300"
        >
          {lines.map((line, index) => (
            <motion.p
              key={`${project.id}-line-${index}`}
              variants={lineVariants}
            >
              {line.text}

              {index === lines.length - 1 && (
                <span
                  className="ml-1 inline-block h-3 w-1.5 animate-pulse align-middle"
                  style={{
                    backgroundColor: ACCENT,
                  }}
                  aria-hidden="true"
                />
              )}
            </motion.p>
          ))}
        </motion.div>

        {/* Terminal footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-gray-500">
          <span>
            {project.technologies?.[0] ?? "Runtime"} Runtime
          </span>

          <span
            className="font-bold"
            style={{
              color: ACCENT,
            }}
          >
            {project.metrics?.[0]?.value ?? "Live"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black py-24"
    >
      {/* Ambient background animation */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[150px]"
        style={{
          background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center space-y-3 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-wider"
            style={{
              borderColor: `${ACCENT}4D`,
              color: ACCENT,
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />

            <span>03 // Featured Work</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Engineered Projects &{" "}
            <span style={{ color: ACCENT }}>
              Full-Stack Solutions
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Real-world systems highlighting automated code
            intelligence, academic resource allocation algorithms,
            and full-stack enterprise portals.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
              }}
              className="relative rounded-3xl"
            >
              {/* Featured animated ring */}
              {project.featured && (
                <div className="pointer-events-none absolute -inset-[1.5px] overflow-hidden rounded-3xl">
                  <motion.div
                    className="absolute -inset-[50%]"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, ${ACCENT} 12%, transparent 26%)`,
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              <SpotlightCard
                spotlightRgb={ACCENT_RGB}
                className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-black"
              >
                <div className="flex h-full flex-col">
                  {/* Project Visual */}
                  {renderProjectVisual(project)}

                  {/* Card Body */}
                  <div className="flex-1 space-y-4 p-6 sm:p-7">
                    {/* Category */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: ACCENT,
                        }}
                      >
                        {project.category}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-gray-400">
                        {project.badgeText}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {project.title}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs font-medium text-gray-500">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="line-clamp-3 text-xs leading-relaxed text-gray-300 sm:text-sm">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 pt-2">
                      {project.features
                        .slice(0, 3)
                        .map((feature, featureIndex) => (
                          <div
                            key={`${project.id}-feature-${featureIndex}`}
                            className="flex items-center gap-2 text-xs text-gray-400"
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0"
                              style={{
                                color: ACCENT,
                              }}
                            />

                            <span className="truncate">
                              {feature}
                            </span>
                          </div>
                        ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {project.technologies
                        .slice(0, 5)
                        .map((technology) => (
                          <span
                            key={`${project.id}-${technology}`}
                            className="rounded-lg border border-white/[0.08] bg-white/5 px-2 py-1 text-[11px] font-mono text-gray-300"
                          >
                            {technology}
                          </span>
                        ))}

                      {project.technologies.length > 5 && (
                        <span className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1 text-[11px] font-mono text-gray-500">
                          +
                          {project.technologies.length -
                            5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/[0.06] px-6 pb-6 pt-4">
                    {/* Details */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProject(project)
                      }
                      className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-80"
                      style={{
                        color: ACCENT,
                      }}
                    >
                      <span>Details</span>

                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* GitHub */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title}`}
                        title="GitHub Repository"
                        className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 transition-colors hover:bg-white hover:text-black"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>

                      {/* Live Demo */}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo for ${project.title}`}
                        className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-black transition-transform hover:scale-[1.03]"
                        style={{
                          backgroundColor: ACCENT,
                        }}
                      >
                        <span>Live Demo</span>

                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}