"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  color?: "primary" | "secondary" | "tertiary";
}

export function SkillBar({
  name,
  level,
  index,
  color = "primary",
}: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const colorClasses = {
    primary: "from-accent-primary to-accent-secondary",
    secondary: "from-accent-secondary to-accent-tertiary",
    tertiary: "from-accent-tertiary to-accent-primary",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-accent-primary">
          {name}
        </span>
        <motion.span
          className="text-sm text-text-secondary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {isInView && (
            <Counter from={0} to={level} duration={1} delay={index * 0.1} />
          )}
          %
        </motion.span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{
            duration: 1,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

// Animated counter component
interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
}

function Counter({ from, to, duration = 1, delay = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {isInView ? (
          <AnimatedNumber from={from} to={to} duration={duration} delay={delay} />
        ) : (
          from
        )}
      </motion.span>
    </motion.span>
  );
}

function AnimatedNumber({
  from,
  to,
  duration,
  delay,
}: {
  from: number;
  to: number;
  duration: number;
  delay: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      onAnimationStart={() => {
        if (!nodeRef.current) return;
        const node = nodeRef.current;
        const startTime = performance.now() + delay * 1000;

        const updateNumber = (currentTime: number) => {
          const elapsed = Math.max(0, currentTime - startTime);
          const progress = Math.min(elapsed / (duration * 1000), 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          const currentValue = Math.round(from + (to - from) * easeProgress);
          node.textContent = String(currentValue);

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        };

        requestAnimationFrame(updateNumber);
      }}
    >
      {from}
    </motion.span>
  );
}
