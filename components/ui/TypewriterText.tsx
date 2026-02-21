"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  loop?: boolean;
  pauseDuration?: number;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 100,
  className = "",
  showCursor = true,
  loop = false,
  pauseDuration = 2000,
  onComplete,
}: TypewriterTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  useEffect(() => {
    // Skip animation for reduced motion preference
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setHasCompletedOnce(true);
      onComplete?.();
      return;
    }

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay, prefersReducedMotion, text, onComplete]);

  useEffect(() => {
    if (!isTyping || prefersReducedMotion) return;

    // Typing phase
    if (!isDeleting && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }

    // Finished typing
    if (!isDeleting && displayedText.length === text.length) {
      if (!hasCompletedOnce) {
        setHasCompletedOnce(true);
        onComplete?.();
      }

      if (loop) {
        // Pause before deleting
        const pauseTimeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(pauseTimeout);
      }
    }

    // Deleting phase (only in loop mode)
    if (isDeleting && displayedText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, speed / 2); // Delete faster than typing
      return () => clearTimeout(timeout);
    }

    // Finished deleting, restart typing
    if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }
  }, [displayedText, isTyping, isDeleting, text, speed, loop, pauseDuration, onComplete, prefersReducedMotion, hasCompletedOnce]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !prefersReducedMotion && (
        <motion.span
          className="inline-block w-[3px] bg-accent-primary ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          style={{ height: "1em", verticalAlign: "text-bottom" }}
        />
      )}
    </span>
  );
}
