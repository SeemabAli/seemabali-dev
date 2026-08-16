"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const finish = () => {
      setTimeout(() => {
        setExiting(true);
        setTimeout(onDone, 500);
      }, 300);
    };

    if (document.readyState === "complete") {
      setTimeout(finish, 400);
    } else {
      window.addEventListener("load", finish, { once: true });
      const timeout = setTimeout(finish, 4000);
      return () => {
        window.removeEventListener("load", finish);
        clearTimeout(timeout);
      };
    }
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Single spinning ring */}
          <div className="relative w-10 h-10">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{ borderTopColor: "#ccff00" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
