"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Calendar,
  BookOpen,
  Award,
  CheckCircle2,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

export default function Education() {
  const edu = portfolioData.education[0];

  return (
    <section id="education" className="py-24 relative bg-black overflow-hidden">
      {/* Background ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // Academic Foundation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Education & <span style={{ color: ACCENT }}>Qualifications</span>
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Rigorous academic grounding in computer science fundamentals, algorithmic
            problem solving, and software engineering methodologies.
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard
              spotlightRgb={ACCENT_RGB}
              className="rounded-3xl border border-white/10 bg-[#080808] p-6 sm:p-10 space-y-8 relative overflow-hidden hover:border-[#ccff00]/30 transition-all duration-300"
            >
              {/* Top info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                    style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
                  >
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className="px-2.5 py-0.5 rounded-full border text-xs font-mono"
                        style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0D`, color: ACCENT }}
                      >
                        Bachelor of Science
                      </span>
                      <span className="text-xs font-mono text-gray-400">● {edu.period}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {edu.degree}
                    </h3>

                    <p className="text-sm sm:text-base font-semibold text-gray-300 mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300 self-start sm:self-auto shrink-0"
                >
                  <Calendar className="w-4 h-4" style={{ color: ACCENT }} />
                  <span>
                    {edu.period} ({edu.status})
                  </span>
                </div>
              </div>

              {/* Degree overview */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10">
                {edu.details}
              </p>

              {/* Core Coursework Grid */}
              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                  <BookOpen className="w-4 h-4" style={{ color: ACCENT }} />
                  <span>Core Computer Science & Engineering Coursework</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {edu.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 text-xs text-gray-300 transition-colors"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Highlights */}
              <div className="space-y-3 relative z-10 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                  <Award className="w-4 h-4" style={{ color: ACCENT }} />
                  <span>Academic & Practical Highlights</span>
                </div>

                <div className="space-y-2.5">
                  {edu.achievements.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: ACCENT }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}