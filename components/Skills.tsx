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
  Code2,
  Database,
  Terminal,
  Layers,
} from "lucide-react";
import { portfolioData, SkillCategory } from "@/data/portfolioData";

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

  return (
    <section id="skills" className="py-24 relative bg-[#030712] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // TECH STACK & EXPERTISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Skills & <span className="gradient-text-cyan-blue">Modern Technologies</span>
          </h2>

          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            A comprehensive overview of the programming languages, frameworks, cloud tools, and AI technologies in my daily workflow.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:bg-slate-800"
              }`}
            >
              All Skills ({portfolioData.skills.reduce((acc, cat) => acc + cat.skills.length, 0)})
            </button>

            {portfolioData.skills.map((category) => (
              <button
                key={category.title}
                type="button"
                onClick={() => setActiveCategory(category.title)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === category.title
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:bg-slate-800"
                }`}
              >
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel-interactive rounded-3xl p-6 sm:p-8 flex flex-col justify-between group"
            >
              {/* Category Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300 shadow-md">
                      {categoryIcons[category.title] || <Layers className="w-5 h-5" />}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        {category.skills.length} Technologies
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills Badges Grid */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/item relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-200 cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-xs font-medium text-slate-200 group-hover/item:text-white">
                        {skill.name}
                      </span>
                      {skill.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-blue-500/20 text-cyan-300 border border-blue-400/20">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag indicator */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Production Stack
                </span>
                <span>Active 2026</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
