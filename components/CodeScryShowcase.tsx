"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
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
  Maximize2,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  FileCode,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";
const TOTAL_DURATION = 40; // 40 seconds demo

export default function CodeScryShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "terminal" | "schema">("video");

  // Playback timer engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            return 0;
          }
          return Math.min(prev + 0.25 * playbackSpeed, TOTAL_DURATION);
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(clickX / rect.width, 1));
    setCurrentTime(newProgress * TOTAL_DURATION);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Determine current active phase based on currentTime
  const currentPhaseIndex = Math.min(Math.floor((currentTime / TOTAL_DURATION) * 4), 3);

  const ragSteps = [
    {
      step: "01",
      title: "AST Ingestion & Chunking",
      tech: "FastAPI / GitHub Webhook",
      icon: <Server className="w-5 h-5" style={{ color: ACCENT }} />,
      timeRange: "00:00 - 00:10",
      description:
        "Extracts repository ASTs, strips comments, counts tiktoken tokens, and performs AST-aware recursive chunking with zero syntax splits.",
    },
    {
      step: "02",
      title: "Vector Embeddings & Indexing",
      tech: "Qdrant / text-embedding-3-small",
      icon: <Database className="w-5 h-5" style={{ color: ACCENT }} />,
      timeRange: "00:10 - 00:20",
      description:
        "Generates 1536-dim vector embeddings, storing payload metadata in Qdrant with HNSW cosine search for sub-15ms context retrieval.",
    },
    {
      step: "03",
      title: "LangChain LLM Orchestration",
      tech: "OpenAI GPT-4o / LangChain Engine",
      icon: <Workflow className="w-5 h-5" style={{ color: ACCENT }} />,
      timeRange: "00:20 - 00:30",
      description:
        "Synthesizes retrieved security context with zero-shot prompt templates to detect CWE-327 vulnerability in token hashing routines.",
    },
    {
      step: "04",
      title: "Pydantic v2 Schema Enforcement",
      tech: "Strict JSON Validation & Patching",
      icon: <ShieldCheck className="w-5 h-5" style={{ color: ACCENT }} />,
      timeRange: "00:30 - 00:40",
      description:
        "Enforces response_format: { type: 'json_object' } with strict Pydantic v2 schemas for severity enums, CVSS scores, and executable remediation snippets.",
    },
  ];

  const pydanticJsonSchema = `{
  "request_id": "codescry_audit_8923a1f",
  "status": "completed",
  "scan_latency_ms": 142,
  "analysis": {
    "repository": "CodeScry-AI/backend-microservice",
    "target_file": "app/auth/security.py",
    "findings": [
      {
        "severity": "CRITICAL",
        "category": "Cryptographic Flaw",
        "cve_identifier": "CWE-327",
        "line_number": 42,
        "issue": "Insecure cryptographic hashing algorithm (MD5) used for token generation",
        "remediation_code": "import secrets\\n\\ndef generate_token() -> str:\\n    return secrets.token_hex(32)",
        "explanation": "MD5 is vulnerable to collision attacks. Replaced with cryptographically secure secrets.token_hex."
      }
    ]
  }
}`;

  return (
    <section id="codescry-ai" className="py-20 relative bg-transparent overflow-hidden">
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[450px] rounded-full blur-[150px] opacity-20 transform-gpu"
        style={{ background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>✦ // Flagship AI Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            CodeScry AI — <span style={{ color: ACCENT }}>System Deep Dive</span>
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            A production-ready RAG pipeline orchestrating FastAPI, Qdrant Vector DB, LangChain, and strict Pydantic v2 schemas for automated code vulnerability remediation.
          </p>

          {/* Quick Tab Switcher: Video Demo / Interactive Terminal / Pydantic JSON */}
          <div className="flex items-center gap-2 pt-2">
            {[
              { id: "video", label: "Interactive Demo Video", icon: Play },
              { id: "terminal", label: "Live Terminal Stream", icon: Terminal },
              { id: "schema", label: "Pydantic v2 JSON Schema", icon: Code2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                    isActive
                      ? "bg-[#ccff00] text-black font-bold shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                      : "bg-[#080808] text-gray-400 border border-white/10 hover:text-white hover:border-white/25"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Left Interactive Player (7 Cols) / Right 4-Step RAG Pipeline (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          {/* Left Column: 16:9 Interactive Video & Demo Player */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col"
          >
            <SpotlightCard
              className="rounded-3xl border border-white/10 bg-[#080808] overflow-hidden flex flex-col h-full hover:border-[#ccff00]/30 transition-all duration-300"
              spotlightRgb={ACCENT_RGB}
            >
              {/* Window Titlebar */}
              <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between bg-[#050505]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-gray-400">
                    codescry-ai-pipeline.mp4
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-mono px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: `${ACCENT}12`,
                      borderColor: `${ACCENT}40`,
                      color: ACCENT,
                    }}
                  >
                    16:9 60FPS REPLAY
                  </span>
                  <a
                    href="https://github.com/SeemabAli/codescry-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                    title="View Source on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Player Body Viewport */}
              <div className="relative aspect-video w-full bg-[#030712] flex-1 overflow-hidden flex flex-col justify-between select-none">
                {/* Visual Background Matrix/Code stream */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                {/* TAB 1: INTERACTIVE VIDEO SIMULATION */}
                {activeTab === "video" && (
                  <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full">
                    {/* Top status bar */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${isPlaying ? "animate-ping" : ""}`}
                          style={{ backgroundColor: ACCENT }}
                        />
                        <span className="text-white font-bold">
                          {currentPhaseIndex === 0 && "STAGE 1: Ingesting AST Syntax Trees"}
                          {currentPhaseIndex === 1 && "STAGE 2: Querying Qdrant 1536-dim Vectors"}
                          {currentPhaseIndex === 2 && "STAGE 3: LangChain LLM Vulnerability Scan"}
                          {currentPhaseIndex === 3 && "STAGE 4: Emitting Pydantic Remediation"}
                        </span>
                      </div>
                      <span className="text-gray-400 text-[11px]">
                        Latency: <span style={{ color: ACCENT }}>142ms</span>
                      </span>
                    </div>

                    {/* Stage 0: Code Ingestion & AST Scanner */}
                    {currentPhaseIndex === 0 && (
                      <div className="my-auto space-y-2.5 font-mono text-xs bg-[#080808]/90 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
                          <span className="flex items-center gap-1.5 text-white">
                            <FileCode className="w-3.5 h-3.5 text-[#ccff00]" />
                            app/auth/security.py
                          </span>
                          <span className="text-[10px]">AST Tokens: 4,210</span>
                        </div>
                        <div className="space-y-1 text-gray-300 text-[11px] leading-relaxed">
                          <div className="text-gray-500"># Parsing Python Abstract Syntax Tree</div>
                          <div><span className="text-purple-400">import</span> hashlib</div>
                          <div><span className="text-purple-400">def</span> <span className="text-blue-400">generate_session_token</span>(user_id: <span className="text-emerald-400">str</span>):</div>
                          <div className="pl-4 text-yellow-300/80 bg-yellow-500/10 px-1 py-0.5 rounded border border-yellow-500/20">
                            raw = user_id + str(time.time())
                          </div>
                          <div className="pl-4 text-red-400 bg-red-500/10 px-1 py-0.5 rounded border border-red-500/30">
                            <span className="font-bold text-red-300">return hashlib.md5(raw.encode()).hexdigest()</span>
                          </div>
                        </div>
                        <div className="pt-2 flex items-center gap-2 text-[10px] text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full animate-ping bg-[#ccff00]" />
                          <span>Chunking AST nodes without breaking function boundaries...</span>
                        </div>
                      </div>
                    )}

                    {/* Stage 1: Qdrant Vector Retrieval */}
                    {currentPhaseIndex === 1 && (
                      <div className="my-auto space-y-3 font-mono text-xs bg-[#080808]/90 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
                          <span className="flex items-center gap-1.5 text-white">
                            <Database className="w-3.5 h-3.5 text-[#ccff00]" />
                            Qdrant HNSW Vector Search
                          </span>
                          <span style={{ color: ACCENT }} className="text-[10px]">1536-dim Embedding</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2.5 rounded-lg bg-black/60 border border-white/5">
                            <div className="text-gray-400 text-[10px]">Top Vector Match</div>
                            <div className="text-white font-bold truncate">security_cryptographic_rules</div>
                            <div className="text-[#ccff00] text-[10px] mt-1">Cosine Sim: 0.942</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-black/60 border border-white/5">
                            <div className="text-gray-400 text-[10px]">Vector Distance Metric</div>
                            <div className="text-white font-bold">CWE-327 Hash Rules</div>
                            <div className="text-[#ccff00] text-[10px] mt-1">HNSW Hops: 3</div>
                          </div>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: ACCENT }}
                            initial={{ width: "20%" }}
                            animate={{ width: "95%" }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stage 2: Vulnerability Detection & LLM Analysis */}
                    {currentPhaseIndex === 2 && (
                      <div className="my-auto space-y-2.5 font-mono text-xs bg-red-950/20 p-4 rounded-xl border border-red-500/30">
                        <div className="flex items-center justify-between text-red-400 border-b border-red-500/20 pb-2">
                          <span className="flex items-center gap-1.5 font-bold">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            CRITICAL VULNERABILITY DETECTED
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                            CVSS 9.8
                          </span>
                        </div>
                        <div className="text-gray-300 text-[11px] space-y-1">
                          <div><span className="text-gray-500">Issue:</span> Insecure Cryptographic Hash (MD5)</div>
                          <div><span className="text-gray-500">Identifier:</span> <span className="text-red-400 font-bold">CWE-327 / OWASP A02:2021</span></div>
                          <div><span className="text-gray-500">Target:</span> app/auth/security.py:42</div>
                          <div className="text-gray-400 text-[10px] pt-1">
                            Prompt template synthesizing remediation via LangChain output parser...
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 3: Remediation & Pydantic Validation */}
                    {currentPhaseIndex === 3 && (
                      <div className="my-auto space-y-2.5 font-mono text-xs bg-[#080808]/90 p-4 rounded-xl border border-[#ccff00]/30">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2" style={{ color: ACCENT }}>
                          <span className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            AUTOMATED REMEDIATION GENERATED
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#ccff00]/20 text-white">
                            Pydantic v2 Validated
                          </span>
                        </div>
                        <div className="text-[11px] space-y-1.5">
                          <div className="text-red-400 line-through opacity-75">
                            - return hashlib.md5(raw.encode()).hexdigest()
                          </div>
                          <div className="text-[#ccff00] font-bold bg-[#ccff00]/10 p-1.5 rounded border border-[#ccff00]/30">
                            + import secrets<br />
                            + return secrets.token_hex(32)
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Live Progress Bar Scrubber */}
                    <div className="space-y-1.5 pt-2">
                      <div
                        onClick={handleSeek}
                        className="relative w-full h-2 rounded-full bg-white/10 cursor-pointer overflow-hidden group/bar"
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            width: `${(currentTime / TOTAL_DURATION) * 100}%`,
                            backgroundColor: ACCENT,
                            boxShadow: `0 0 10px ${ACCENT}`,
                          }}
                        />
                      </div>

                      {/* Video Player Controls Bar */}
                      <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-1">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={togglePlay}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                            aria-label={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 fill-white" />
                            ) : (
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleRestart}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                            title="Restart Demo"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>

                          <span className="text-[11px] tabular-nums">
                            {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPlaybackSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
                            className="px-2 py-0.5 rounded text-[10px] border border-white/10 hover:border-[#ccff00]/40 text-gray-300 hover:text-[#ccff00] transition-colors"
                          >
                            {playbackSpeed}x Speed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: LIVE TERMINAL STREAM */}
                {activeTab === "terminal" && (
                  <div className="p-4 font-mono text-xs text-gray-300 space-y-2 overflow-y-auto h-full scrollbar-thin bg-black/80">
                    <div className="text-gray-500">$ python -m uvicorn app.main:app --reload --port 8000</div>
                    <div className="text-[#ccff00]">[INFO] FastAPI server initialized on worker PID 1420</div>
                    <div className="text-gray-400">[HOOK] Received GitHub Pull Request webhook payload #892</div>
                    <div className="text-gray-400">[AST] Parsing syntax trees for 14 changed files...</div>
                    <div className="text-purple-400">[QDRANT] Embeddings batch created via text-embedding-3-small (1536 dim)</div>
                    <div className="text-yellow-400">[WARN] AST Node Line 42: Identified insecure MD5 token generator</div>
                    <div className="text-red-400">[SECURITY] Matched CWE-327 rule. Prompting LangChain remediation engine...</div>
                    <div className="text-[#ccff00]">[DONE] Generated Pydantic v2 patch schema in 142ms. HTTP 200 OK</div>
                  </div>
                )}

                {/* TAB 3: PYDANTIC SCHEMA JSON */}
                {activeTab === "schema" && (
                  <div className="p-4 font-mono text-xs text-gray-300 overflow-y-auto h-full scrollbar-thin bg-black/80">
                    <pre className="text-[11px] leading-relaxed text-[#ccff00]/90 whitespace-pre-wrap">
                      {pydanticJsonSchema}
                    </pre>
                  </div>
                )}
              </div>

              {/* Card Footer Stack Tags */}
              <div className="p-4 border-t border-white/10 bg-[#050505] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-gray-400 font-mono">Architecture Stack:</span>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  {["FastAPI", "Qdrant Vector DB", "LangChain", "OpenAI GPT-4o", "Pydantic v2"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg border text-gray-300"
                      style={{
                        backgroundColor: "#0d0d0d",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right Column: 4-Step RAG Pipeline Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {ragSteps.map((step, idx) => {
              const isCurrentStep = currentPhaseIndex === idx;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onClick={() => {
                    setCurrentTime(idx * 10);
                    setIsPlaying(true);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrentStep
                      ? "bg-[#0c1402] border-[#ccff00]/60 shadow-[0_0_25px_rgba(204,255,0,0.15)]"
                      : "bg-[#080808] border-white/10 hover:border-white/20 hover:bg-[#0c0c0c]"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl border shrink-0 transition-all ${
                        isCurrentStep ? "border-[#ccff00] text-black" : "border-white/10 text-gray-400"
                      }`}
                      style={{
                        backgroundColor: isCurrentStep ? ACCENT : "#050505",
                        color: isCurrentStep ? "#000" : ACCENT,
                      }}
                    >
                      {step.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-white tracking-wide">
                          {step.step} // {step.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isCurrentStep
                              ? "bg-[#ccff00]/20 text-[#ccff00] font-bold"
                              : "text-gray-500"
                          }`}
                        >
                          {step.timeRange}
                        </span>
                      </div>

                      <div className="font-mono text-[11px] text-gray-400 mb-1.5" style={{ color: isCurrentStep ? ACCENT : undefined }}>
                        {step.tech}
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
