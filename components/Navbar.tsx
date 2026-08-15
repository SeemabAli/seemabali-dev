"use client";

import React, { useState, useEffect } from "react";

const ACCENT = "#ccff00";

// label is what's displayed; id is the actual section id on the page.
// Kept as separate fields on purpose — "Home" displays as Home but the
// hero section's real id is "hero", and "Project" points at the
// "projects" section, so a naive `#${label.toLowerCase()}` (what the
// previous version did) silently pointed most links nowhere.
const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Project", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
] as const;

const Navbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Trigger initial slide-down animation
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);

        // Modern touch: a thin progress line showing scroll position,
        // fixed above the nav so it stays visible even when the nav
        // itself slides away.
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
      {/* Scroll progress line */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, backgroundColor: ACCENT }}
        />
      </div>

      <div
        className={`fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4 md:pt-5 transition-all duration-700 ease-in-out ${show ? "translate-y-0 opacity-100" : "-translate-y-[120%] opacity-0"
          }`}
      >
        {/* Glassmorphism floating pill */}
        <nav className="w-full max-w-5xl flex items-center justify-between gap-4 px-5 py-3 md:px-7 md:py-3.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("hero");
            }}
            className="text-white font-black text-lg md:text-xl tracking-widest uppercase cursor-pointer relative z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm"
          >
            Seemab Ali
          </a>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="text-gray-300 text-sm hover:text-[#ccff00] transition-colors uppercase tracking-wider font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm"
              >
                {item.label}
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
        </nav>
      </div>

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