"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { Project } from "@/data/portfolioData";

const ACCENT = "#ccff00";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const featureContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const featureItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock page scroll and allow Escape to close while the modal is open.
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl rounded-3xl bg-black border border-white/15 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6"
        >
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono mb-2"
                style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0D`, color: ACCENT }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.badgeText}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm font-medium mt-1" style={{ color: ACCENT }}>
                {project.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white hover:text-black text-gray-400 border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Detailed Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              System Architecture & Overview
            </h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {project.longDescription ?? project.description}
            </p>
          </div>

          {/* Key Metrics if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-lg sm:text-xl font-black text-white">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono text-gray-500">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Core Features List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Core Capabilities & Modules
            </h4>
            <motion.div
              variants={featureContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
            >
              {project.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={featureItemVariants}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-gray-300"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: ACCENT }}
                  />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Technologies Stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA — source code is the only action now that Live
              Demo has been removed, so it gets the primary treatment. */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: ACCENT }}
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}