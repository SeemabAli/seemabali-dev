"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    /** RGB triplet string, e.g. "204,255,0" — kept as a raw triplet so we
     *  can control opacity independently in the radial-gradient below. */
    spotlightRgb?: string;
}

/**
 * Wraps its children in a relatively-positioned box and paints a soft
 * radial glow that follows the cursor while hovering. Purely decorative —
 * `pointer-events-none` on the glow layer so it never intercepts clicks.
 */
export default function SpotlightCard({
    children,
    className = "",
    spotlightRgb = "204,255,0",
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const [active, setActive] = useState(false);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                    opacity: active ? 1 : 0,
                    background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, rgba(${spotlightRgb},0.14), transparent 70%)`,
                }}
            />
            <div className="relative z-10 h-full flex flex-col">{children}</div>
        </div>
    );
}