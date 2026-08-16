"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Cpu,
  Wrench,
  Sparkles,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

// Approximate fill percentage per skill level — purely visual, gives the
// bars something meaningful to animate to.
const LEVEL_FILL: Record<string, number> = {
  Specialized: 95,
  Advanced: 88,
  Proficient: 72,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <Layout className="w-5 h-5" />,
    Backend: <Server className="w-5 h-5" />,
    "AI & Modern Development": <Cpu className="w-5 h-5" />,
    "Tools & DevOps": <Wrench className="w-5 h-5" />,
  };

  const filteredCategories =
    activeCategory === "all"
      ? portfolioData.skills
      : portfolioData.skills.filter((c) => c.title === activeCategory);

  const tabs = ["all", ...portfolioData.skills.map((c) => c.title)];

  return (
    <section id="skills" className="py-24 relative bg-black overflow-hidden">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-[100px] sm:blur-[140px] opacity-40 pointer-events-none transform-gpu"
        style={{ background: `radial-gradient(circle, ${ACCENT}1F 0%, transparent 70%)` }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-[100px] sm:blur-[140px] opacity-35 pointer-events-none transform-gpu"
        style={{ background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // Tech Stack & Expertise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Specialized Skills & <span style={{ color: ACCENT }}>Modern Technologies</span>
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            A comprehensive overview of the programming languages, frameworks, cloud
            tools, and AI technologies in my daily workflow.
          </p>

          {/* Category Filter Tabs — sliding active pill */}
          <div className="relative flex flex-wrap items-center justify-center gap-2 pt-4">
            {tabs.map((tab) => {
              const isAll = tab === "all";
              const label = isAll
                ? `All Skills (${portfolioData.skills.reduce(
                  (acc, cat) => acc + cat.skills.length,
                  0
                )})`
                : tab;
              const isActive = activeCategory === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCategory(tab)}
                  className="relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: ACCENT }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className="relative z-10"
                    style={{ color: isActive ? "#000" : "#9ca3af" }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <SpotlightCard
                spotlightRgb={ACCENT_RGB}
                className="rounded-3xl border border-white/10 bg-[#080808] p-6 sm:p-8 hover:border-[#ccff00]/30 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}0D`, color: ACCENT }}
                  >
                    {categoryIcons[category.title] || <Layers className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-500">
                      {category.skills.length} Technologies
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills with animated proficiency bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-gray-200 truncate">
                          {skill.name}
                        </span>
                        {skill.badge && (
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded-md border shrink-0"
                            style={{ borderColor: `${ACCENT}33`, color: ACCENT }}
                          >
                            {skill.badge}
                          </span>
                        )}
                      </div>
                      <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${LEVEL_FILL[skill.level] ?? 70}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: sIdx * 0.06,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: ACCENT }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom tag indicator */}
                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span className="flex items-center gap-1.5" style={{ color: ACCENT }}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Production Stack
                  </span>
                  <span>Active 2026</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}