"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolioData";
import centerImage from "../public/Images/portfolioImage2.png";

interface HeroProps {
  /** Called once the intro (scramble + slide-up) animation finishes,
   *  so a parent layout can unlock the rest of the page. */
  onPreloadComplete?: () => void;
  onOpenChat?: () => void;
}

const START_WORD = "SEEMAB";
const TARGET_WORD = "PORTFOLIO";
const ACCENT = "#ccff00";

function splitRole(role: string): [string, string] {
  const [first, ...rest] = role.trim().split(" ");
  return [first, rest.join(" ") || ""];
}

const Hero: React.FC<HeroProps> = ({ onPreloadComplete, onOpenChat }) => {
  const [text, setText] = useState(START_WORD);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [roleBold, roleItalic] = splitRole(
    portfolioData.personal.role ?? "Software Developer"
  );

  // Continuous lime glow sweeping behind the portrait, left <-> right.
  // Runs the whole time — it's simply hidden until the image slides into
  // view, so it already looks "live" the moment it appears.
  useEffect(() => {
    if (!glowRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    gsap.set(glowRef.current, { left: "-15%" });
    const glowTween = gsap.to(glowRef.current, {
      left: "75%",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      glowTween.kill();
    };
  }, []);

  useEffect(() => {
    // Lock scroll during the intro animation
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    let iterations = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let isMounted = true;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const imageSrc =
      typeof centerImage === "string" ? centerImage : (centerImage as { src: string }).src;

    const imageLoadPromise = new Promise<void>((resolve) => {
      const img = new window.Image();
      img.src = imageSrc;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });

    const delayPromise = new Promise<void>((resolve) => {
      timeoutId = setTimeout(resolve, 1000);
    });

    Promise.all([imageLoadPromise, delayPromise]).then(() => {
      if (!isMounted) return;

      intervalId = setInterval(() => {
        setText(() => {
          return TARGET_WORD.split("")
            .map((letter, index) => {
              if (index < Math.floor(iterations)) {
                return TARGET_WORD[index]; // Target letter
              }
              if (index < START_WORD.length) {
                return START_WORD[index]; // Original letter
              }
              return "";
            })
            .join("");
        });

        if (iterations >= TARGET_WORD.length) {
          if (intervalId) clearInterval(intervalId);

          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "auto";
              onPreloadComplete?.();
            },
          });

          const isMobile = window.innerWidth < 768;

          // 1. Move the central text container up to its resting place
          tl.to(
            containerRef.current,
            {
              top: isMobile ? "20%" : "45%",
              duration: 1.5,
              ease: "power3.inOut",
            },
            "+=0.2"
          );

          // 2. Fade + slide up the subtitle and buttons
          tl.fromTo(
            [subtitleRef.current, buttonsRef.current],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
            "-=1.0"
          );

          // 3. Slide the portrait up into place
          tl.fromTo(
            imageRef.current,
            { y: "100vh" },
            { y: 0, duration: 1.5, ease: "power3.out" },
            "-=1.2"
          );

          // 4. Once settled, start the lime shimmer sweeping through the
          // wordmark on a loop. Kicked off outside the timeline (via
          // tl.call) rather than as a tween inside it, since an infinite
          // tween inside the timeline would mean the timeline itself
          // never completes — which would silently break the scroll
          // unlock / onPreloadComplete callback above.
          if (!reduceMotion) {
            tl.call(
              () => {
                if (!textRef.current) return;
                gsap.set(textRef.current, { backgroundPosition: "200% 0%" });
                gsap.to(textRef.current, {
                  backgroundPosition: "-50% 0%",
                  duration: 4.5,
                  repeat: -1,
                  ease: "sine.inOut",
                  yoyo: true,
                });
              },
              [],
              "-=0.3"
            );
          }
        }
        iterations += 1 / 3; // Controls the speed of the letter swap
      }, 50);
    });

    return () => {
      isMounted = false;
      document.body.style.overflow = "auto";
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [onPreloadComplete]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: "radial-gradient(circle, #222222 0%, #000000 80%)" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div
        ref={containerRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none flex flex-col items-start w-max"
      >
        <h1
          ref={textRef}
          className="text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter text-transparent bg-clip-text drop-shadow-2xl pr-4 md:pr-8 leading-none uppercase"
          style={{
            backgroundImage: `linear-gradient(100deg, #4b5563 0%, #e5e7eb 35%, ${ACCENT} 50%, #e5e7eb 65%, #4b5563 100%)`,
            backgroundSize: "250% 100%",
            backgroundPosition: "200% 0%",
          }}
        >
          {text}
        </h1>

        <p
          ref={subtitleRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-8 text-white text-base md:text-2xl lg:text-4xl drop-shadow-md z-10 opacity-0 w-max"
        >
          <span className="font-bold">{roleBold}</span>{" "}
          <span className="font-light italic text-gray-300">{roleItalic}</span>
        </p>

        <div
          ref={buttonsRef}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-auto md:right-20 flex items-center gap-2 md:gap-4 pointer-events-auto z-10 opacity-0 w-max"
        >
          <a
            href="#contact"
            className="group w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-gray-400/50 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          >
            <svg
              className="w-3 h-3 md:w-4 md:h-4 text-gray-300 transition-transform duration-300 group-hover:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17H16M7 17V8" />
            </svg>
          </a>

          <a
            href="#contact"
            className="px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-gray-400/50 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          >
            <span className="text-gray-300 text-xs md:text-base italic font-light tracking-wider">
              Contact
            </span>
          </a>

          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-[#ccff00]/40 flex items-center justify-center backdrop-blur-md bg-[#ccff00]/10 hover:bg-[#ccff00]/20 text-[#ccff00] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            >
              <span className="text-xs md:text-base font-semibold tracking-wider flex items-center gap-1.5">
                ✦ Ask AI
              </span>
            </button>
          )}
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative z-10 text-center text-white flex flex-col items-center w-full pointer-events-none translate-y-[100vh]"
      >
        {/* Animated glow sweeping behind the portrait */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 z-0 w-2/3 max-w-xs aspect-square rounded-full blur-3xl opacity-70"
          style={{
            background: `radial-gradient(circle, ${ACCENT}80 0%, ${ACCENT}30 45%, transparent 75%)`,
          }}
        />

        <img
          src={typeof centerImage === "string" ? centerImage : centerImage.src}
          alt="Hero portrait graphic"
          className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
      </div>
    </section>
  );
};

export default Hero;