"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Code2, Layout, Brain, Wrench } from "lucide-react";
import { skillCategories } from "@/data/portfolio-content";
import { SkillCard } from "@/components/ui/SkillCard";
import { SplitText } from "@/components/ui/SplitText";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-5 w-5" />,
  Layout: <Layout className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
};

// Color rotation for skill cards
const colorRotation: ("primary" | "secondary" | "tertiary")[] = [
  "primary",
  "secondary",
  "tertiary",
];

// Stat card component with explicit color classes
function StatCard({
  number,
  label,
  colorClass,
  gradient,
  delay,
}: {
  number: string;
  label: string;
  colorClass: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
      whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
      />

      {/* Number */}
      <motion.div
        className={`relative text-4xl font-bold ${colorClass} md:text-5xl`}
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: delay + 0.1,
          type: "spring",
          stiffness: 200,
        }}
      >
        {number}
      </motion.div>

      <div className="relative mt-2 text-sm text-text-secondary">{label}</div>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
  const prefersReducedMotion = useReducedMotion();

  const activeSkillsData = skillCategories.find(
    (c) => c.name === activeCategory
  );

  return (
    <section id="skills" className="relative min-h-screen px-6 py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-primary/5 blur-[120px]"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent-secondary/5 blur-[120px]"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, -40, 0],
                  y: [0, -40, 0],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-tertiary/5 blur-[100px]"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="mb-4 text-sm uppercase tracking-[0.2em] text-accent-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What I Know
          </motion.p>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            <SplitText
              text="Skills & Expertise"
              type="words"
              animation="slideUp"
              staggerDelay={0.05}
            />
          </h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-text-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Technologies and tools I&apos;ve worked with throughout my journey
            as a software engineer.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="Skill categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              role="tab"
              aria-selected={activeCategory === category.name}
              aria-controls="skills-panel"
              onClick={() => setActiveCategory(category.name)}
              className={`group relative flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeCategory === category.name
                  ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
                  : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="pointer"
            >
              <span className="flex items-center gap-2">
                {iconMap[category.icon]}
                {category.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id="skills-panel"
            role="tabpanel"
            aria-label={`${activeCategory} skills`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {activeSkillsData?.skills.map((skill, index) => (
              <SkillCard
                key={skill}
                name={skill}
                index={index}
                color={colorRotation[index % 3]}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Floating decorative elements */}
        {!prefersReducedMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-accent-primary/20"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <StatCard number="8+" label="Languages" colorClass="text-accent-primary" gradient="from-accent-primary to-accent-secondary" delay={0.6} />
          <StatCard number="4+" label="Frameworks" colorClass="text-accent-secondary" gradient="from-accent-secondary to-accent-tertiary" delay={0.7} />
          <StatCard number="20+" label="Technologies" colorClass="text-accent-tertiary" gradient="from-accent-tertiary to-accent-primary" delay={0.8} />
          <StatCard number="3+" label="Projects" colorClass="text-accent-primary" gradient="from-accent-primary to-accent-tertiary" delay={0.9} />
        </motion.div>
      </div>
    </section>
  );
}
