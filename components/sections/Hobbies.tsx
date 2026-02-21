"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { BookOpen, Music } from "lucide-react";
import { hobbies } from "@/data/portfolio-content";
import { SplitText } from "@/components/ui/SplitText";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Music,
};

export function Hobbies() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hobbies"
      ref={containerRef}
      className="relative min-h-[60vh] bg-bg-primary px-6 py-24"
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-accent-tertiary/5 blur-[150px]" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="mb-4 text-sm uppercase tracking-[0.2em] text-accent-tertiary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Beyond Work
          </motion.p>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            <SplitText
              text="Hobbies & Interests"
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
            Things that keep me inspired and energized outside of coding.
          </motion.p>
        </motion.div>

        {/* Hobbies Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {hobbies.map((hobby, index) => {
            const IconComponent = iconMap[hobby.icon] || BookOpen;

            return (
              <motion.div
                key={hobby.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent-tertiary/50 hover:shadow-xl hover:shadow-accent-tertiary/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
              >
                {/* Gradient accent on hover */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-tertiary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-accent-tertiary/10 text-accent-tertiary transition-colors group-hover:bg-accent-tertiary/20">
                    <IconComponent className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="mb-2 inline-block rounded-full bg-accent-tertiary/15 px-2.5 py-0.5 text-xs font-medium text-accent-tertiary">
                      {hobby.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-text-primary">
                      {hobby.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
