"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ACCENT = "#ccff00";

// label is what's displayed; id is the actual section id on the page.
// Kept as separate fields on purpose — "Home" displays as Home but the
// hero section's real id is "hero", and "Project" points at the
// "projects" section, so a naive `#${label.toLowerCase()}` (what an
// earlier version did) silently pointed most links nowhere.
const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Project", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
] as const;

const Navbar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
        setIsScrolled(window.scrollY > 20);

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    controlNavbar();
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Full-width edge-to-edge glass bar, flush with the top */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${show ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "bg-black/20 backdrop-blur-md border-b border-white/[0.06]"
          }`}
      >
        {/* Moving lime shimmer sweeping along the bottom edge — the "live" cue */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden pointer-events-none">
          <motion.div
            className="h-full w-1/3"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            }}
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("hero");
            }}
            className="flex items-center gap-2 text-white font-black text-lg md:text-xl tracking-widest uppercase cursor-pointer relative z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm"
          >
            Seemab Ali
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
              aria-hidden="true"
            />
          </a>

          {/* Navigation Links (Desktop) — animated underline on hover */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="group relative text-gray-300 text-sm hover:text-white transition-colors uppercase tracking-wider font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm py-1"
              >
                {item.label}
                <span
                  className="absolute left-0 -bottom-0.5 h-[1.5px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: ACCENT }}
                />
              </a>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            className="md:hidden text-white cursor-pointer hover:text-[#ccff00] transition-colors relative z-50 p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Scroll progress line — sits on the very top edge of the bar itself */}
        <div className="h-[2px] bg-transparent">
          <div
            className="h-full transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%`, backgroundColor: ACCENT }}
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay — glassmorphism full-screen panel */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              // NOTE: the stagger delay is set inline rather than via a
              // `delay-${index * 100}` class — Tailwind can't generate
              // arbitrary classes from a runtime template string, so that
              // version of the delay was silently a no-op.
              style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms" }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={`text-white text-3xl font-black uppercase tracking-widest hover:text-[#ccff00] transition-all duration-500 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;