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

const ACCENT = "#ccff00";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-black overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
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
            Hands-on software development in enterprise and agency environments,
            delivering client-focused web applications and modern frontend solutions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-4 group pb-6"
            >
              {/* Timeline Marker */}
              <div
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-black group-hover:scale-125 transition-transform duration-300"
                style={{ backgroundColor: ACCENT, boxShadow: `0 0 12px ${ACCENT}CC` }}
              />

              {/* Experience Card */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="px-2.5 py-0.5 rounded-full border text-xs font-mono"
                        style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}0D`, color: ACCENT }}
                      >
                        {exp.type}
                      </span>
                      {exp.period.toLowerCase().includes("present") && (
                        <span className="text-xs font-mono text-gray-400">● Present</span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400 mt-1">
                      <span className="flex items-center gap-1 text-gray-300">
                        <Building className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-gray-300 w-fit">
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
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                    Key Contributions & Development Scope
                  </h4>
                  <div className="space-y-2">
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
                    style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}0D` }}
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
                          className="text-xs text-gray-300 bg-black/40 p-2.5 rounded-xl border border-white/5"
                        >
                          {impact}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}