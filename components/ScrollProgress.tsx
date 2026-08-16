"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ACCENT = "#ccff00";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Spring smoothing makes the bar feel silky rather than jerky
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] origin-left z-[9999] pointer-events-none"
      style={{
        scaleX,
        background: `linear-gradient(to right, ${ACCENT}CC, ${ACCENT})`,
        boxShadow: `0 0 10px ${ACCENT}99`,
      }}
    />
  );
}
