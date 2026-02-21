"use client";

import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  type?: "chars" | "words";
  animation?: "fadeUp" | "fadeIn" | "slideUp" | "reveal";
  gradient?: boolean;
}

const animations: Record<string, { container: Variants; item: Variants }> = {
  fadeUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: 0,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
  },
  fadeIn: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.02,
          delayChildren: 0,
        },
      },
    },
    item: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    },
  },
  slideUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.04,
          delayChildren: 0,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
  },
  reveal: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.02,
          delayChildren: 0,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 100, rotateX: -90 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
  },
};

export function SplitText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  staggerDelay = 0.03,
  type = "chars",
  animation = "fadeUp",
  gradient = false,
}: SplitTextProps) {
  const { container, item } = animations[animation];

  const elements = useMemo(() => {
    if (type === "words") {
      return text.split(" ").map((word, i) => ({
        text: word,
        key: `word-${i}`,
      }));
    }
    return text.split("").map((char, i) => ({
      text: char === " " ? "\u00A0" : char,
      key: `char-${i}`,
    }));
  }, [text, type]);

  const containerVariants: Variants = {
    ...container,
    visible: {
      ...container.visible,
      transition: {
        ...((container.visible as { transition?: object }).transition || {}),
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1000 }}
    >
      {elements.map(({ text: char, key }) => (
        <motion.span
          key={key}
          className={`inline-block ${gradient ? "gradient-text" : ""} ${charClassName}`}
          variants={item}
          style={{ transformOrigin: "bottom" }}
        >
          {type === "words" ? (
            <>
              {char}
              <span>&nbsp;</span>
            </>
          ) : (
            char
          )}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Animated line reveal for headings
interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
