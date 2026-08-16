"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const ACCENT = "#ccff00";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
] as const;

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 90) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Track currently active section for navbar highlight
  useEffect(() => {
    const sectionIds = ["hero", ...NAV_LINKS.map((l) => l.id)];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-black/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            : "bg-black/30 backdrop-blur-md border-b border-white/[0.06]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="w-full h-16 sm:h-20 flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("hero");
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="font-black text-lg sm:text-xl tracking-tight text-white uppercase group-hover:text-white transition-colors">
                {portfolioData.personal.brand ?? "Seemab"}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_#ccff00]"
                style={{ backgroundColor: ACCENT }}
              />
            </a>

            {/* Desktop Navigation Links — Alive, Interactive Glass Pill Island */}
            <div className="hidden md:flex items-center gap-1 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#ccff00]"
                        : "text-gray-400 hover:text-[#ccff00] hover:bg-white/[0.05]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-xl border pointer-events-none"
                        style={{
                          backgroundColor: `${ACCENT}1A`,
                          borderColor: `${ACCENT}55`,
                          boxShadow: `0 0 16px ${ACCENT}26`,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span
                        className="relative z-10 w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_#ccff00]"
                        style={{ backgroundColor: ACCENT }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action Button (Desktop CTA) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-white/25 text-xs font-mono text-gray-300 hover:text-white transition-colors"
              >
                Resume
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("contact");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.35)]"
                style={{ backgroundColor: ACCENT }}
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation"
              className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/85 flex flex-col justify-between pt-24 pb-10 px-6 md:hidden"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                Navigation
              </span>

              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      isActive
                        ? "bg-[#ccff00]/10 border-[#ccff00]/40 text-[#ccff00]"
                        : "bg-white/[0.02] border-white/5 text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-lg font-bold tracking-tight">{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full shadow-[0_0_8px_#ccff00]" style={{ backgroundColor: ACCENT }} />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Footer CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-3 pt-6 border-t border-white/10"
            >
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.03] text-center text-xs font-mono text-gray-200"
              >
                Download Resume PDF
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("contact");
                }}
                className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider text-black"
                style={{ backgroundColor: ACCENT }}
              >
                Let&apos;s Work Together
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}