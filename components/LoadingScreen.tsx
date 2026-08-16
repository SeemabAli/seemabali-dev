"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

const ACCENT = "#ccff00";

const CRITICAL_IMAGES = [
  "/Images/portfolioImage2.png",
  "/og-image.jpg",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING KERNEL");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    let isCancelled = false;

    // Preload critical images in parallel
    const preloadImages = Promise.all(
      CRITICAL_IMAGES.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // resolve anyway so we don't hang
          })
      )
    );

    // Ensure document & fonts ready
    const preloadFonts = typeof document !== "undefined" && "fonts" in document
      ? document.fonts.ready
      : Promise.resolve();

    const assetsPromise = Promise.all([preloadImages, preloadFonts]);

    const interval = setInterval(() => {
      if (isCancelled) return;

      currentProgress += Math.floor(Math.random() * 8) + 4;

      if (currentProgress < 30) {
        setStatus("INITIALIZING ENGINES");
      } else if (currentProgress < 65) {
        setStatus("CACHING SHADERS & ASSETS");
      } else if (currentProgress < 90) {
        setStatus("OPTIMIZING 3D & MOTION GRAPHS");
      } else {
        setStatus("READY");
      }

      if (currentProgress >= 95) {
        // Wait for assets to actually finish
        assetsPromise.then(() => {
          if (isCancelled) return;
          setProgress(100);
          clearInterval(interval);

          setTimeout(() => {
            setIsDone(true);
            setTimeout(onDone, 450);
          }, 250);
        });
      } else {
        setProgress(Math.min(currentProgress, 95));
      }
    }, 45);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] select-none overflow-hidden"
        >
          {/* Subtle background ambient glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full blur-[140px] pointer-events-none opacity-40"
            style={{ background: `radial-gradient(circle, ${ACCENT}2A 0%, transparent 70%)` }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-xs sm:max-w-sm w-full px-6 space-y-6">
            {/* Pulsing Brand Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center"
            >
              <div
                className="w-16 h-16 rounded-2xl border flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.25)]"
                style={{
                  borderColor: `${ACCENT}4D`,
                  backgroundColor: `${ACCENT}12`,
                  color: ACCENT,
                }}
              >
                <Terminal className="w-8 h-8" />
              </div>
              <span
                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full animate-ping"
                style={{ backgroundColor: ACCENT, opacity: 0.6 }}
              />
            </motion.div>

            {/* Title & Brand */}
            <div className="text-center space-y-1">
              <h1 className="text-xl font-black tracking-tight text-white uppercase font-mono">
                SEEMAB ALI
              </h1>
              <p className="text-xs font-mono text-gray-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3" style={{ color: ACCENT }} />
                <span>FULL-STACK // AI ARCHITECTURE</span>
              </p>
            </div>

            {/* High-Tech Progress Bar */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span className="truncate max-w-[200px]" style={{ color: ACCENT }}>
                  {status}
                </span>
                <span className="font-bold text-white tabular-nums">
                  {progress}%
                </span>
              </div>

              {/* Bar track */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/5">
                <motion.div
                  className="h-full rounded-full transition-all duration-100 ease-out"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: ACCENT,
                    boxShadow: `0 0 12px ${ACCENT}`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
