"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Send,
  Sparkles,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  MapPin,
  Bot,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { portfolioData } from "@/data/portfolioData";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

interface ContactProps {
  onOpenChat?: () => void;
}

export default function Contact({ onOpenChat }: ContactProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Full-Time Role / Project Inquiry",
    projectType: "Next.js Web App",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const projectTypes = [
    "Full-Time Role",
    "Next.js Web App",
    "AI Agent / Integration",
    "Frontend UI Engineering",
    "Freelance / Contract",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setSubmitError(data.error ?? "Something went wrong. Please try emailing directly.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: [ACCENT, "#ffffff", "#9ca3af"],
      });
    } catch {
      setSubmitError("Network error. Please try emailing directly.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-black overflow-hidden">
      {/* Background ambient lighting */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.1, 1] }}
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
            <span>06 // Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Have a <span style={{ color: ACCENT }}>project</span> in mind?
          </h2>

          <p className="text-gray-400 max-w-2xl text-base sm:text-lg leading-relaxed font-normal">
            Let&apos;s build something modern, useful, and high-impact together.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Connect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Status & Availability Card */}
            <SpotlightCard
              spotlightRgb={ACCENT_RGB}
              className="rounded-3xl border border-white/10 bg-[#080808] p-6 sm:p-7 space-y-4 hover:border-[#ccff00]/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_#ccff00]"
                  style={{ backgroundColor: ACCENT }}
                />
                <span className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                  Open for Opportunities
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Whether you have an open engineering position, a full-stack web
                application, an AI-powered MVP, or just want to connect — my inbox
                is always open.
              </p>

              <div className="pt-2 flex flex-col gap-3">
                {/* Email with copy button */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-black/60 border border-white/10">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0"
                      style={{ color: ACCENT }}
                    >
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-gray-500">Direct Email</div>
                      <div className="text-xs font-semibold text-white truncate">
                        {portfolioData.personal.email}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 flex items-center gap-1 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                        <span style={{ color: ACCENT }}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-gray-300">
                  <div
                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0"
                    style={{ color: ACCENT }}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500">Location</div>
                    <div className="font-semibold text-white">
                      {portfolioData.personal.location}
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-gray-300">
                  <div
                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0"
                    style={{ color: ACCENT }}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500">Response Speed</div>
                    <div className="font-semibold text-white">Within 24 Hours</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Social Links Box */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-[#080808] hover:border-[#ccff00]/40 p-4 flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-5 h-5 text-gray-300 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-white">LinkedIn</div>
                    <div className="text-[10px] font-mono text-gray-500">Connect</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#ccff00] transition-colors" />
              </a>

              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-[#080808] hover:border-[#ccff00]/40 p-4 flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-5 h-5 text-gray-300 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-white">GitHub</div>
                    <div className="text-[10px] font-mono text-gray-500">Code</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#ccff00] transition-colors" />
              </a>
            </div>

            {/* Ask AI Assistant Prompt */}
            {onOpenChat && (
              <button
                type="button"
                onClick={onOpenChat}
                className="w-full rounded-2xl p-4 flex items-center justify-between text-left group border transition-all duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0D` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl border flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Have questions right now?
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Ask {portfolioData.chatbot?.name ?? "the AI"} instantly
                    </div>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 animate-pulse" style={{ color: ACCENT }} />
              </button>
            )}
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <SpotlightCard
              spotlightRgb={ACCENT_RGB}
              className="rounded-3xl border border-white/10 bg-[#080808] p-6 sm:p-8 relative hover:border-[#ccff00]/30 transition-all duration-300"
            >
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div
                    className="w-16 h-16 rounded-2xl border flex items-center justify-center shadow-[0_0_25px_rgba(204,255,0,0.3)]"
                    style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md">
                    Thank you for reaching out,{" "}
                    <span className="font-semibold" style={{ color: ACCENT }}>
                      {formState.name}
                    </span>
                    . {portfolioData.personal.name.split(" ")[0]} will review your note and
                    respond back to{" "}
                    <span style={{ color: ACCENT }}>{formState.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        subject: "Project Inquiry",
                        projectType: "Next.js Web App",
                        message: "",
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Fill out the form below and I&apos;ll get back to you promptly.
                    </p>
                  </div>

                  {/* Project Category Pills */}
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-2">
                      I&apos;m reaching out regarding:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => {
                        const isActive = formState.projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setFormState({ ...formState, projectType: type })
                            }
                            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all border"
                            style={
                              isActive
                                ? { backgroundColor: ACCENT, color: "#000", borderColor: ACCENT, boxShadow: `0 0 15px ${ACCENT}40` }
                                : {
                                  backgroundColor: "rgba(255,255,255,0.03)",
                                  color: "#9ca3af",
                                  borderColor: "rgba(255,255,255,0.1)",
                                }
                            }
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-mono text-gray-300">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/10 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] text-white placeholder-gray-600 text-sm outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-mono text-gray-300">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/10 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] text-white placeholder-gray-600 text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-mono text-gray-300">
                      Project Details / Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project, timeline, goals, or role details..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/10 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] text-white placeholder-gray-600 text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold uppercase tracking-wide text-black transition-all duration-300 active:scale-[0.98] disabled:opacity-50 hover:shadow-[0_0_25px_rgba(204,255,0,0.5)]"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Error state */}
                  {submitError && (
                    <p className="text-xs text-red-400 text-center pt-1 font-mono">
                      ⚠ {submitError}
                    </p>
                  )}
                </form>
              )}
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}