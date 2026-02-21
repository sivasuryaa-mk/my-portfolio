"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface RollingTextProps {
  texts: string[];
  delay?: number;
  typingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function RollingText({
  texts,
  delay = 0,
  typingSpeed = 80,
  pauseDuration = 2000,
  className = "",
}: RollingTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentText = texts[currentIndex];

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      setDisplayedText(texts[0]);
      return;
    }

    const startTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay, prefersReducedMotion, texts]);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;

    // Typing phase
    if (isTyping && !isDeleting && displayedText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    // Finished typing - pause before deleting
    if (isTyping && !isDeleting && displayedText.length === currentText.length) {
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    // Deleting phase
    if (isDeleting && displayedText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, typingSpeed / 2); // Delete faster
      return () => clearTimeout(timeout);
    }

    // Finished deleting - move to next text
    if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }
  }, [isVisible, isTyping, isDeleting, displayedText, currentText, typingSpeed, pauseDuration, texts.length, prefersReducedMotion]);

  // For reduced motion, cycle through texts instantly
  useEffect(() => {
    if (!prefersReducedMotion || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setDisplayedText(texts[(currentIndex + 1) % texts.length]);
    }, pauseDuration + 1000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isVisible, texts, currentIndex, pauseDuration]);

  if (!isVisible) return null;

  return (
    <span className={className}>
      {displayedText}
      {!prefersReducedMotion && (
        <motion.span
          className="inline-block w-[2px] bg-current ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          style={{ height: "1em", verticalAlign: "text-bottom" }}
        />
      )}
    </span>
  );
}
