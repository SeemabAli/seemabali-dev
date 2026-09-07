"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gauge, CheckCircle2, Sparkles, Zap } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

interface LighthouseMetric {
  id: string;
  name: string;
  score: number;
  description: string;
}

const LIGHTHOUSE_METRICS: LighthouseMetric[] = [
  {
    id: "performance",
    name: "Performance",
    score: 100,
    description: "Instant FCP, LCP < 0.8s, 60fps animations",
  },
  {
    id: "accessibility",
    name: "Accessibility",
    score: 100,
    description: "WCAG 2.1 AA compliant, screen-reader friendly",
  },
  {
    id: "best-practices",
    name: "Best Practices",
    score: 100,
    description: "Modern HTTPS, strict CSP, ESM bundles",
  },
  {
    id: "seo",
    name: "SEO",
    score: 100,
    description: "Structured metadata, OpenGraph, semantic markup",
  },
];

export default function LighthouseBadge() {
  // SVG Circle calculations (Radius = 38, Circumference = 2 * PI * 38 ≈ 238.76)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="lighthouse-metrics" className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SpotlightCard
          className="glass-card-glow rounded-2xl p-6 sm:p-8 border border-white/10"
          spotlightRgb="16,185,129"
        >
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Chrome DevTools Lighthouse Audit
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> 100% Verified
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  Engineered for maximum speed, accessibility, web standards, and search indexing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono text-slate-400 bg-slate-900/60 px-3.5 py-2 rounded-lg border border-white/5">
              <Sparkles className="w-4 h-4 text-[#ccff00]" />
              <span>Target: Next.js App Router & Edge Optimization</span>
            </div>
          </div>

          {/* 4 Score Circles Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {LIGHTHOUSE_METRICS.map((metric, idx) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
              >
                {/* Score Circle */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background track circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="text-slate-800"
                      strokeWidth="7"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* Glowing outer ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="text-emerald-500/20"
                      strokeWidth="11"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* Animated foreground score ring */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="text-emerald-400"
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>

                  {/* Inner Score Number */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight group-hover:scale-105 transition-transform duration-300">
                      {metric.score}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest">
                      PASSED
                    </span>
                  </div>
                </div>

                {/* Metric Label & Description */}
                <h4 className="text-base font-semibold text-slate-200 mb-1 group-hover:text-emerald-300 transition-colors">
                  {metric.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ccff00]" />
              <span>Audited on Chrome DevTools v126 (Desktop & Mobile viewports)</span>
            </div>
            <div className="font-mono text-emerald-400/90">
              Score: 100/100 across all 4 categories
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
