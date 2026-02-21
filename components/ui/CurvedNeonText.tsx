"use client";

import { motion } from "framer-motion";

interface CurvedNeonTextProps {
  text?: string;
  className?: string;
  pulseGlow?: boolean;
}

export function CurvedNeonText({ className = "", pulseGlow = false }: CurvedNeonTextProps) {
  return (
    <motion.div
      className={`absolute -top-[50px] md:-top-[55px] lg:-top-[60px] left-1/2 -translate-x-1/2 w-[250px] md:w-[300px] lg:w-[380px] xl:w-[450px] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox="0 0 500 120"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        aria-label="Think Big"
        role="img"
      >
        {/* SVG Filters for neon glow effects - #CCFF00 lime green */}
        <defs>
          {/* Neon glow for text - reduced intensity */}
          <filter id="textNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.7" result="blur1" />
            <feGaussianBlur stdDeviation="3.4" result="blur2" />
            <feGaussianBlur stdDeviation="6.8" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger pulsing neon glow for bulb */}
          <filter id="bulbNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feGaussianBlur stdDeviation="12" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Curved arc path - upward curve */}
          <path id="curvedTextPath" d="M 50 100 Q 250 20 450 100" fill="none" />
        </defs>

        {/* "Think Big" text - lime green WITH neon glow */}
        <text
          filter="url(#textNeonGlow)"
          fontSize="36"
          fontWeight="bold"
          fontFamily="var(--font-display)"
          textAnchor="middle"
          fill="#F8B4C4"
        >
          <textPath href="#curvedTextPath" startOffset="45%">
            Think Big
          </textPath>
        </text>

        {/* Bulb emoji - lime green WITH stronger neon glow */}
        <motion.text
          filter="url(#bulbNeonGlow)"
          fontSize="40"
          textAnchor="middle"
          fill="#CCFF00"
          animate={pulseGlow ? { opacity: [1, 0.6, 1] } : {}}
          transition={pulseGlow ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}}
        >
          <textPath href="#curvedTextPath" startOffset="72%">
            💡
          </textPath>
        </motion.text>
      </svg>
    </motion.div>
  );
}
