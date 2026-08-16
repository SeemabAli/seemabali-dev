"use client";

import React from "react";
import { ArrowUp, Code2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { portfolioData } from "@/data/portfolioData";

const ACCENT = "#ccff00";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.06] items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl border flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
              >
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-black text-lg text-white tracking-tight uppercase">
                {portfolioData.personal.brand ?? portfolioData.personal.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Software Engineering Graduate & Modern Web Developer building
              high-performance, responsive web applications and AI-driven interfaces.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono pt-1" style={{ color: ACCENT }}>
              <span className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_#ccff00]" style={{ backgroundColor: ACCENT }} />
              <span>{portfolioData.personal.badge ?? "Available for opportunities"}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors py-1 flex items-center gap-1 group"
                >
                  <span className="transition-transform group-hover:translate-x-0.5" style={{ color: ACCENT }}>›</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="md:col-span-3 flex flex-col sm:items-end justify-between space-y-4">
            <div className="space-y-2 sm:text-right">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300">
                Connect
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all duration-200"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all duration-200"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  aria-label={`Email ${portfolioData.personal.name.split(" ")[0]}`}
                  className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-[#ccff00]/10 hover:border-[#ccff00]/50 hover:text-[#ccff00] border border-white/10 text-xs font-mono text-gray-300 transition-all duration-200 self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            >
              <ArrowUp className="w-3.5 h-3.5" style={{ color: ACCENT }} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>{portfolioData.personal.name} © {new Date().getFullYear()}. All rights reserved.</div>

          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Designed & built with</span>
            <span className="text-white font-semibold">Next.js</span>,
            <span className="text-white font-semibold">Tailwind CSS</span> &
            <span className="font-semibold" style={{ color: ACCENT }}>AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}