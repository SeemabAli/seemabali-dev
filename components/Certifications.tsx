"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Award, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import SpotlightCard from "@/components/SpotlightCard";

const ACCENT = "#ccff00";
const ACCENT_RGB = "204,255,0";

// SVG brand marks for each issuer — inline so no external image deps
const IssuerIcon = ({
  issuerKey,
  className,
  style,
}: {
  issuerKey: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  switch (issuerKey) {
    case "meta":
      return (
        // Meta infinity-loop wordmark simplified
        <svg viewBox="0 0 48 48" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 24c0-4.5 2.2-8.5 5.5-11S19 10 24 10s8.5 1.5 12.5 3S43 19.5 43 24s-2.2 8.5-5.5 11S29 38 24 38s-8.5-1.5-12.5-3S6 28.5 6 24z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="18" cy="24" rx="5" ry="8" stroke="currentColor" strokeWidth="2.5" />
          <ellipse cx="30" cy="24" rx="5" ry="8" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "w3schools":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="4" y="34" fontSize="26" fontWeight="900" fontFamily="monospace">W3</text>
        </svg>
      );
    case "udemy":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
          <path d="M17 18v8a7 7 0 0014 0v-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 14l4 4 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "navttc":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 36L24 12l16 24H8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M16 36V24h16v12" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case "hitesh":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2.5" />
          <path d="M10 40c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return <Award className={className} style={style} />;
  }
};

// Marquee strip — a continuously scrolling banner of cert names
const CertMarquee = () => {
  const certs = portfolioData.certifications;
  // Double the array so the scroll looks seamless
  const items = [...certs, ...certs];

  return (
    <div className="relative overflow-hidden py-4 mb-14">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex gap-6 w-max will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((cert, i) => (
          <div
            key={`${cert.title}-${i}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border shrink-0"
            style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}08` }}
          >
            <IssuerIcon issuerKey={cert.issuerKey} className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="text-xs font-mono font-medium text-gray-300 whitespace-nowrap">
              {cert.title}
            </span>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-md border shrink-0"
              style={{ borderColor: `${ACCENT}33`, color: ACCENT }}
            >
              {cert.year}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Certifications() {
  const certs = portfolioData.certifications;

  return (
    <section id="certifications" className="py-24 relative bg-black overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full blur-[100px] sm:blur-[160px] opacity-35 pointer-events-none transform-gpu"
        style={{ background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // Certifications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Verified{" "}
            <span style={{ color: ACCENT }}>Credentials & Training</span>
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Industry-recognized certifications from Meta, Udemy, W3Schools, and
            NAVTTC — validating expertise across the full stack.
          </p>
        </div>

        {/* Scrolling Marquee Strip */}
        <CertMarquee />

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
            >
              <SpotlightCard
                spotlightRgb={ACCENT_RGB}
                className="group h-full rounded-2xl border border-white/10 bg-[#080808] p-5 flex flex-col gap-4 hover:border-[#ccff00]/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Issuer Icon + Year */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      borderColor: `${ACCENT}33`,
                      backgroundColor: `${ACCENT}0D`,
                      color: ACCENT,
                    }}
                  >
                    <IssuerIcon issuerKey={cert.issuerKey} className="w-6 h-6" />
                  </div>

                  <span
                    className="text-[10px] font-mono px-2 py-1 rounded-lg border shrink-0"
                    style={{ borderColor: `${ACCENT}33`, color: ACCENT, backgroundColor: `${ACCENT}08` }}
                  >
                    {cert.year}
                  </span>
                </div>

                {/* Cert Info */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white leading-snug tracking-tight mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] font-mono text-gray-500">{cert.issuer}</p>
                </div>

                {/* Bottom link */}
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${cert.title} on LinkedIn`}
                  className="flex items-center gap-1.5 text-[11px] font-semibold transition-colors group/link"
                  style={{ color: ACCENT }}
                >
                  <span className="group-hover/link:underline">View on LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary badge */}
        <div className="flex justify-center mt-10">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-xs font-mono"
            style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}08`, color: ACCENT }}
          >
            <Award className="w-4 h-4" />
            <span>{certs.length} Certifications — Continuously Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}
