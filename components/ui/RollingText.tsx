"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface RoleItem {
  text: string;
  icon?: ReactNode;
}

interface RollingTextProps {
  texts: string[] | RoleItem[];
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

  // Normalize texts to RoleItem format
  const normalizedTexts: RoleItem[] = texts.map((item) =>
    typeof item === "string" ? { text: item } : item
  );

  const currentItem = normalizedTexts[currentIndex];
  const currentText = currentItem.text;
  const currentIcon = currentItem.icon;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      setDisplayedText(normalizedTexts[0].text);
      return;
    }

    const startTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay, prefersReducedMotion, normalizedTexts]);

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
      setCurrentIndex((prev) => (prev + 1) % normalizedTexts.length);
    }
  }, [isVisible, isTyping, isDeleting, displayedText, currentText, typingSpeed, pauseDuration, normalizedTexts.length, prefersReducedMotion]);

  // For reduced motion, cycle through texts instantly
  useEffect(() => {
    if (!prefersReducedMotion || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % normalizedTexts.length);
      setDisplayedText(normalizedTexts[(currentIndex + 1) % normalizedTexts.length].text);
    }, pauseDuration + 1000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isVisible, normalizedTexts, currentIndex, pauseDuration]);

  if (!isVisible) return null;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {currentIcon && <span className="inline-flex shrink-0">{currentIcon}</span>}
      <span>
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
    </span>
  );
}
