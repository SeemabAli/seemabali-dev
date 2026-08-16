"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  Building,
  TrendingUp,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-transparent overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[150px] opacity-35 pointer-events-none transform-gpu"
        style={{ background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 // Work History</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Professional <span style={{ color: ACCENT }}>Experience</span>
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Hands-on software engineering in enterprise and client-facing environments,
            delivering scalable web applications, Sitecore CMS workflows, and modern UI solutions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-4 group pb-8"
            >
              {/* Timeline Glowing Node */}
              <div
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-black group-hover:scale-125 transition-transform duration-300"
                style={{ backgroundColor: ACCENT, boxShadow: `0 0 16px ${ACCENT}` }}
              />

              {/* Experience Spotlight Card */}
              <SpotlightCard
                spotlightRgb={ACCENT_RGB}
                className="rounded-3xl border border-white/10 bg-[#080808] p-6 sm:p-8 space-y-6 hover:border-[#ccff00]/30 transition-all duration-300"
              >
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className="px-2.5 py-0.5 rounded-full border text-xs font-mono"
                        style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0D`, color: ACCENT }}
                      >
                        {exp.type}
                      </span>
                      {exp.period.toLowerCase().includes("present") && (
                        <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
                          Present Role
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400 mt-1.5">
                      <span className="flex items-center gap-1.5 text-gray-200">
                        <Building className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300 w-fit shrink-0">
                    <Calendar className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 font-mono flex items-center gap-2">
                    <span className="w-1 h-3 rounded-full" style={{ backgroundColor: ACCENT }} />
                    Key Contributions & Development Scope
                  </h4>
                  <div className="space-y-2 pt-1">
                    {exp.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: ACCENT }}
                        />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Highlights */}
                {exp.impactPoints && exp.impactPoints.length > 0 && (
                  <div
                    className="p-4 rounded-2xl border space-y-2"
                    style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}08` }}
                  >
                    <div
                      className="flex items-center gap-1.5 text-xs font-bold font-mono"
                      style={{ color: ACCENT }}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Key Highlights & Impact</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {exp.impactPoints.map((impact, k) => (
                        <div
                          key={k}
                          className="text-xs text-gray-300 bg-black/60 p-2.5 rounded-xl border border-white/5"
                        >
                          {impact}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}