"use client";

import React, { useEffect, useRef } from "react";

const ACCENT = "#ccff00";

// Developer & Matrix cyber characters
const CHARS = "0101010101<>/{};:[]_+=~*#AIλ0x1F7A9B3CDE";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -60);
      }
    };

    init();

    let lastTime = 0;
    const fpsInterval = 1000 / 28; // 28 FPS: smooth cyber stream

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      // Translucent fade over previous frame to create glowing tails
      ctx.fillStyle = "rgba(3, 7, 18, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head drops are bright white/lime, tails are lime
        const isHead = Math.random() > 0.82;
        ctx.fillStyle = isHead ? "#ffffff" : ACCENT;
        ctx.shadowColor = ACCENT;
        ctx.shadowBlur = isHead ? 8 : 3;

        if (y > 0) {
          ctx.fillText(char, x, y);
        }

        // Reset drop to top with randomized variation
        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      ctx.shadowBlur = 0;
    };

    animationFrameId = requestAnimationFrame(draw);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(init, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Live Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-[0.22] sm:opacity-[0.25] transform-gpu"
      />

      {/* Subtle bottom & edge ambient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#030712_95%)] pointer-events-none" />
    </div>
  );
}
