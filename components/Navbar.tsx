"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";

const NAV_LINKS = ["Home", "About", "Service", "Project", "Contact"] as const;

interface NavbarProps {
  onOpenChat?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      }
    };

    window.addEventListener("scroll", controlNavbar);
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-6 transition-all duration-700 ease-in-out ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } ${isMenuOpen ? "bg-black/90 backdrop-blur-md" : "bg-transparent"}`}
      >
        {/* Logo */}
        <div className="text-white font-black text-xl md:text-2xl tracking-widest uppercase cursor-pointer relative z-50">
          SEEMAB ALI
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 text-sm hover:text-[#ccff00] transition-colors uppercase tracking-wider font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm"
            >
              {item}
            </a>
          ))}
          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ccff00]/40 text-[#ccff00] hover:bg-[#ccff00]/10 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            >
              <span>✦ AI Assistant</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          type="button"
          className="md:hidden text-white cursor-pointer hover:text-[#ccff00] transition-colors relative z-50 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              // NOTE: the stagger delay is set inline rather than via a
              // `delay-${index * 100}` class — Tailwind can't generate
              // arbitrary classes from a runtime template string, so that
              // version of the delay was silently a no-op.
              style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms" }}
              className={`text-white text-3xl font-black uppercase tracking-widest hover:text-[#ccff00] transition-all duration-500 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          {onOpenChat && (
            <button
              type="button"
              style={{ transitionDelay: isMenuOpen ? `${NAV_LINKS.length * 100}ms` : "0ms" }}
              onClick={() => {
                setIsMenuOpen(false);
                onOpenChat();
              }}
              className={`text-[#ccff00] text-2xl font-black uppercase tracking-widest hover:brightness-125 transition-all duration-500 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              ✦ Ask AI
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;