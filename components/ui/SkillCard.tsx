"use client";

import { motion } from "framer-motion";
import { SkillIcon } from "./SkillIcon";

interface SkillCardProps {
  name: string;
  index: number;
  color?: "primary" | "secondary" | "tertiary";
}

const colorVariants = {
  primary: {
    border: "hover:border-accent-primary/50",
    glow: "group-hover:shadow-accent-primary/20",
    iconBg: "bg-accent-primary/10",
    iconColor: "text-accent-primary",
  },
  secondary: {
    border: "hover:border-accent-secondary/50",
    glow: "group-hover:shadow-accent-secondary/20",
    iconBg: "bg-accent-secondary/10",
    iconColor: "text-accent-secondary",
  },
  tertiary: {
    border: "hover:border-accent-tertiary/50",
    glow: "group-hover:shadow-accent-tertiary/20",
    iconBg: "bg-accent-tertiary/10",
    iconColor: "text-accent-tertiary",
  },
};

export function SkillCard({ name, index, color = "primary" }: SkillCardProps) {
  const variant = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <div
        className={`
          relative flex w-full flex-col items-center gap-3 rounded-2xl border border-white/10
          bg-gradient-to-br from-white/5 to-white/[0.02] p-6
          backdrop-blur-sm transition-all duration-300
          ${variant.border} ${variant.glow}
          group-hover:shadow-xl
        `}
      >
        {/* Glow effect */}
        <div
          className={`
            absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500
            group-hover:opacity-100 ${variant.iconBg}
          `}
        />

        {/* Icon container */}
        <div
          className={`
            flex h-16 w-16 items-center justify-center rounded-xl
            ${variant.iconBg} ${variant.iconColor}
            transition-all duration-300 group-hover:scale-110
          `}
        >
          <SkillIcon name={name} />
        </div>

        {/* Skill name */}
        <span className="flex min-h-[40px] items-center justify-center text-center text-sm font-medium leading-tight text-text-primary transition-colors group-hover:text-white">
          {name}
        </span>

        {/* Decorative corner accent */}
        <div
          className={`
            absolute -right-1 -top-1 h-8 w-8 rounded-full opacity-0 blur-md
            transition-opacity duration-300 group-hover:opacity-50
            ${variant.iconBg.replace("/10", "/50")}
          `}
        />
      </div>
    </motion.div>
  );
}
