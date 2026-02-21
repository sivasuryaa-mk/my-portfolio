"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
  continuous?: boolean;
  speed?: number;
}

export function GlitchText({
  text,
  className = "",
  glitchOnHover = true,
  continuous = false,
  speed = 50,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous);
  const [displayText, setDisplayText] = useState(text);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (continuous) {
          iteration = 0;
        } else {
          clearInterval(interval);
          setDisplayText(text);
        }
      }

      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [isGlitching, text, continuous, speed]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && !continuous && setIsGlitching(false)}
      data-cursor="pointer"
    >
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute left-0 top-0 z-0 text-accent-primary opacity-70"
            animate={{
              x: [0, -2, 2, -1, 0],
              opacity: [0.7, 0.5, 0.8, 0.6, 0.7],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            aria-hidden
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute left-0 top-0 z-0 text-accent-tertiary opacity-70"
            animate={{
              x: [0, 2, -2, 1, 0],
              opacity: [0.7, 0.6, 0.8, 0.5, 0.7],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            aria-hidden
          >
            {displayText}
          </motion.span>
        </>
      )}
    </motion.span>
  );
}
