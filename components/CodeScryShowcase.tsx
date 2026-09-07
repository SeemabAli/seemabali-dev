"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Cpu,
  Database,
  Workflow,
  Terminal,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Code2,
  Server,
  Zap,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

export default function CodeScryShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideoPlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const pydanticJsonSchema = `{
  "request_id": "review_req_8923a1f",
  "status": "completed",
  "analysis": {
    "repository": "CodeScry-AI/backend-microservice",
    "target_file": "app/auth/security.py",
    "findings": [
      {
        "severity": "CRITICAL",
        "category": "Security Vulnerability",
        "cve_identifier": "CWE-327",
        "line_number": 42,
        "issue": "Insecure cryptographic hashing algorithm (MD5) used for token generation",
        "remediation_code": "import hashlib\\nimport secrets\\n\\ndef generate_secure_token() -> str:\\n    return secrets.token_hex(32)",
        "explanation": "Pydantic v2 schema enforces str enum for severity ('CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW') and mandatory executable Python remediation snippets."
      }
    ]
  }
}`;

  const ragSteps = [
    {
      step: "01",
      title: "Ingestion Pipeline",
      tech: "FastAPI / GitHub API",
      icon: <Server className="w-5 h-5 text-sky-400" />,
      color: "border-sky-500/30 bg-sky-500/10 text-sky-400",
      description:
        "Extracts repository ASTs via GitHub Webhooks, applies tiktoken counting, and performs AST-aware recursive text chunking.",
    },
    {
      step: "02",
      title: "Vector Store & Indexing",
      tech: "Qdrant / text-embedding-3-small",
      icon: <Database className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/30 bg-purple-500/10 text-purple-400",
      description:
        "Generates 1536-dim vector embeddings, storing payload metadata in Qdrant with HNSW similarity search for ultra-fast context retrieval.",
    },
    {
      step: "03",
      title: "LLM Orchestration",
      tech: "LangChain Engine",
      icon: <Workflow className="w-5 h-5 text-[#ccff00]" />,
      color: "border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00]",
      description:
        "Injects retrieved context into structured prompt chains with zero-shot validation and strict output parsing.",
    },
  ];

  return (
    <section id="codescry-ai" className="py-20 relative bg-transparent overflow-hidden">
      {/* Background radial ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none transform-gpu"
        style={{ background: `radial-gradient(circle, ${ACCENT}22 0%, #38bdf815 50%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Architecture Spotlight</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            CodeScry AI — <span className="gradient-text-cyan-blue">System Deep Dive</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed"
          >
            Explore the high-throughput, retrieval-augmented generation (RAG) backend powering automated code review & vulnerability remediation.
          </motion.p>
        </div>

        {/* Main Grid: Left Video Demo / Right 3-Step RAG Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: 16:9 Video Demo Placeholder (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <SpotlightCard
              className="glass-card-glow rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col"
              spotlightRgb={ACCENT_RGB}
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    codescry-ai-demo.mp4
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> 16:9 Live Preview
                </span>
              </div>

              {/* 16:9 Video Demo Container */}
              <div className="relative aspect-video w-full bg-slate-950 flex-1 overflow-hidden group cursor-pointer" onClick={toggleVideoPlay}>
                {/* Visual Video Background / Mock Interface */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-6 flex flex-col justify-between">
                  {/* Mock UI overlay grid */}
                  <div className="flex justify-between items-start opacity-75">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-[#ccff00]" />
                      <span className="font-mono text-xs text-slate-300">CodeScry Engine v2.4</span>
                    </div>
                    <div className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      RAG Pipeline Active
                    </div>
                  </div>

                  {/* Animated scanner overlay lines when playing */}
                  <div className="space-y-3 my-auto max-w-md mx-auto w-full opacity-60">
                    <div className="h-2 bg-slate-800 rounded w-3/4 animate-pulse" />
                    <div className="h-2 bg-sky-500/40 rounded w-full" />
                    <div className="h-2 bg-purple-500/40 rounded w-5/6" />
                    <div className="h-2 bg-emerald-500/40 rounded w-2/3" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Qdrant Vectors: 42,190 chunks</span>
                    <span>Latency: 142ms</span>
                  </div>
                </div>

                {/* Video Play Button Overlay with Hover Effects */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] group-hover:bg-slate-950/20 transition-all duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlay();
                    }}
                    className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ccff00] text-slate-950 flex items-center justify-center shadow-[0_0_35px_rgba(204,255,0,0.5)] group-hover:shadow-[0_0_50px_rgba(204,255,0,0.8)] transition-all duration-300"
                    aria-label={isPlaying ? "Pause Demo Video" : "Play Demo Video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 fill-slate-950 stroke-none" />
                    ) : (
                      <Play className="w-8 h-8 fill-slate-950 stroke-none ml-1" />
                    )}

                    {/* Outer glowing pulsing ring */}
                    <span className="absolute -inset-2 rounded-full border border-[#ccff00]/60 animate-ping pointer-events-none" />
                  </motion.button>
                </div>

                {/* Interactive State Bar */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#ccff00]/30 flex items-center justify-between text-xs text-slate-200 z-30"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
                        Simulating Live RAG Vector Retrieval & Code Analysis...
                      </span>
                      <span className="font-mono text-[#ccff00]">Playing</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Footer Tech Tags */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 font-medium">Core Stack:</div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-sky-300 border border-sky-500/20 font-mono">
                    FastAPI
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-purple-300 border border-purple-500/20 font-mono">
                    Qdrant
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-[#ccff00] border border-[#ccff00]/20 font-mono">
                    LangChain
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-300 border border-emerald-500/20 font-mono">
                    Pydantic v2
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right Column: System Architecture RAG Pipeline (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="h-full flex flex-col space-y-4">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 mb-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-[#ccff00]" />
                  System Architecture Pipeline
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  High-efficiency 3-step RAG flow optimized for sub-200ms semantic code search.
                </p>
              </div>

              {/* 3 Steps List */}
              {ragSteps.map((item, idx) => (
                <SpotlightCard
                  key={item.step}
                  className="glass-card-glow rounded-xl p-5 border border-white/10 hover:border-slate-700 transition-all duration-300"
                  spotlightRgb={ACCENT_RGB}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl border font-mono text-xs font-bold ${item.color}`}>
                      {item.step}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold text-white flex items-center gap-2">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/10">
                          {item.tech}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Prompt Engineering & Structured Outputs UI Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SpotlightCard
            className="glass-card-glow rounded-2xl p-6 sm:p-8 border border-white/10"
            spotlightRgb="56,189,248"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Prompt Engineering & Structured Outputs
                  </h3>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  Enforcing deterministic JSON responses with Pydantic v2 type checking for automated remediation & zero parsing failures.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start lg:self-auto text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3.5 py-1.5 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strict Validation: response_format = json_object</span>
              </div>
            </div>

            {/* Mock Terminal Window displaying JSON schema enforcement */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span className="font-mono text-xs text-slate-300">
                    pydantic_v2_output_schema.json
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Code2 className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Validation: Passed (0 errors)</span>
                </div>
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto selection:bg-sky-500/30 selection:text-sky-200">
                <pre className="text-slate-300">
                  <code>
                    {pydanticJsonSchema.split("\n").map((line, i) => (
                      <div key={i} className="table-row">
                        <span className="table-cell select-none pr-4 text-slate-600 text-right w-8">
                          {i + 1}
                        </span>
                        <span className="table-cell">
                          {line.includes('"severity": "CRITICAL"') ? (
                            <span className="text-red-400 font-bold">{line}</span>
                          ) : line.includes('"status": "completed"') ? (
                            <span className="text-emerald-400">{line}</span>
                          ) : line.includes('"category"') || line.includes('"remediation_code"') ? (
                            <span className="text-sky-300">{line}</span>
                          ) : (
                            line
                          )}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
