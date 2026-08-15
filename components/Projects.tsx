"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Calendar,
  Users,
  Code2,
  Terminal,
  ShieldAlert,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { portfolioData, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Helper visual mockups for each project
  const renderProjectVisual = (project: Project) => {
    if (project.id === "codescry-ai") {
      return (
        <div className="w-full h-48 sm:h-56 bg-[#070d1a] p-4 flex flex-col justify-between font-mono text-xs relative overflow-hidden border-b border-white/[0.08]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] text-slate-400 ml-2">codescry-engine // v2.4</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/30">
              OpenAI + LangChain
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-300 py-2">
            <p className="text-cyan-300">✓ AST Parser: 42 files scanned</p>
            <p className="text-emerald-400">✓ Security Audit: 0 High Vulnerabilities</p>
            <p className="text-amber-300">⚡ AI Code Smell Detected in auth_controller.ts</p>
            <p className="text-purple-300">➔ Generating auto-fix patch via GPT-4o-mini...</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400">
            <span>FastAPI Microservice</span>
            <span className="text-emerald-400 font-bold">98.2% Precision</span>
          </div>
        </div>
      );
    }

    if (project.id === "lecture-timetable-system") {
      return (
        <div className="w-full h-48 sm:h-56 bg-[#060f18] p-4 flex flex-col justify-between font-mono text-xs relative overflow-hidden border-b border-white/[0.08]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] text-slate-400 ml-2">timetable-solver // constraint-engine</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/30">
              NextAuth + Mongo
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 text-[10px]">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-white/5">
              <span className="text-slate-400 block">Mon 09:00</span>
              <span className="text-cyan-300 font-semibold">CS-401 (Room 3A)</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-white/5">
              <span className="text-slate-400 block">Mon 11:30</span>
              <span className="text-purple-300 font-semibold">SE-302 (Lab 2)</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-white/5">
              <span className="text-slate-400 block">Tue 14:00</span>
              <span className="text-emerald-300 font-semibold">AI-505 (Hall B)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400">
            <span>Clash Prevention Engine</span>
            <span className="text-cyan-300 font-bold">100% Conflict Free</span>
          </div>
        </div>
      );
    }

    // attendance-management-system
    return (
      <div className="w-full h-48 sm:h-56 bg-[#120a1c] p-4 flex flex-col justify-between font-mono text-xs relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] text-slate-400 ml-2">attendance-analytics // mern</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30">
            MERN Stack
          </span>
        </div>

        <div className="space-y-2 py-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-300">Department Attendance</span>
            <span className="text-amber-300 font-bold">96.4% Overall</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-2 rounded-full w-[96%]" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 pt-1">
            <span>Active Members: 120+</span>
            <span className="text-emerald-400">Leave Approvals: 100%</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400">
          <span>Enterprise Role-Based Access</span>
          <span className="text-amber-400 font-bold">PDF / CSV Export</span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 relative bg-[#040814]/90 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 // FEATURED WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered Projects & <span className="gradient-text-hero">Full-Stack Solutions</span>
          </h2>

          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Real-world systems highlighting automated code intelligence, academic resource allocation algorithms, and full-stack enterprise portals.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {portfolioData.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel-interactive rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Preview Box */}
                {renderProjectVisual(project)}

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                      {project.badgeText}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium line-clamp-1">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Features Bullet points */}
                  <div className="space-y-1.5 pt-2">
                    {project.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-lg bg-slate-900/90 border border-white/[0.08] text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 rounded-lg bg-slate-900/50 border border-white/5 text-[11px] font-mono text-slate-400">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-2 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.title}`}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all duration-200"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
