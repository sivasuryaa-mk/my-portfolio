"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { experience } from "@/data/portfolio-content";
import { SplitText } from "@/components/ui/SplitText";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animate the timeline line as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen bg-bg-secondary px-6 py-24"
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-accent-primary/5 blur-[150px]" />
        <div className="absolute -left-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent-secondary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="mb-20 text-center"
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
            My Journey
          </motion.p>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            <SplitText
              text="Work Experience"
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
            A timeline of my professional journey and the roles that shaped my
            career as a software engineer.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-12 md:space-y-24">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${exp.role}`}
                experience={exp}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: (typeof experience)[0];
  index: number;
  isLeft: boolean;
}

function ExperienceCard({ experience: exp, index, isLeft }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Timeline dot - Desktop */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
        <motion.div
          className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent-primary bg-bg-secondary"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
        >
          <div className="h-2 w-2 rounded-full bg-accent-primary" />
        </motion.div>
      </div>

      {/* Timeline dot - Mobile */}
      <div className="absolute left-4 -translate-x-1/2 md:hidden">
        <motion.div
          className="flex h-3 w-3 items-center justify-center rounded-full border-2 border-accent-primary bg-bg-secondary"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
        </motion.div>
      </div>

      {/* Content - Desktop */}
      <div
        className={`hidden w-full md:flex ${
          isLeft ? "justify-end pr-12" : "justify-start pl-12"
        }`}
      >
        <div className="w-full max-w-md">
          <TimelineCard exp={exp} index={index} />
        </div>
      </div>

      {/* Spacer - Desktop */}
      <div className="hidden w-full md:block" />

      {/* Content - Mobile */}
      <div className="ml-10 w-full md:hidden">
        <TimelineCard exp={exp} index={index} />
      </div>
    </motion.div>
  );
}

function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experience)[0];
  index: number;
}) {
  const colorVariants = ["primary", "secondary", "tertiary"] as const;
  const color = colorVariants[index % 3];

  const borderColors = {
    primary: "hover:border-accent-primary/50",
    secondary: "hover:border-accent-secondary/50",
    tertiary: "hover:border-accent-tertiary/50",
  };

  const glowColors = {
    primary: "group-hover:shadow-accent-primary/10",
    secondary: "group-hover:shadow-accent-secondary/10",
    tertiary: "group-hover:shadow-accent-tertiary/10",
  };

  const badgeColors = {
    primary: "bg-accent-primary/15 text-accent-primary",
    secondary: "bg-accent-secondary/15 text-accent-secondary",
    tertiary: "bg-accent-tertiary/15 text-accent-tertiary",
  };

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-bg-primary/50 p-6 backdrop-blur-sm transition-all duration-300 ${borderColors[color]} ${glowColors[color]} hover:shadow-xl`}
      whileHover={{ y: -4 }}
    >
      {/* Gradient accent */}
      <div
        className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-${color}/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Header */}
      <div className="relative mb-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-bold text-text-primary">
              {exp.role}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-text-secondary">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{exp.company}</span>
              {exp.companyDescription && (
                <span className="text-sm text-text-secondary/70">
                  ({exp.companyDescription})
                </span>
              )}
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeColors[color]}`}>
            {exp.type}
          </span>
        </div>
      </div>

      {/* Meta info */}
      <div className="relative mb-4 flex flex-wrap gap-4 text-sm text-text-secondary">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{exp.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span>{exp.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4" />
          <span>{exp.workType}</span>
        </div>
      </div>

      {/* Description */}
      <ul className="relative mb-4 space-y-2">
        {exp.description.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-2 text-sm text-text-secondary"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.1 + 0.4 }}
          >
            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-${color}`} />
            {item}
          </motion.li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="relative flex flex-wrap gap-2">
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-text-secondary transition-colors hover:border-accent-primary/30 hover:text-text-primary"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
