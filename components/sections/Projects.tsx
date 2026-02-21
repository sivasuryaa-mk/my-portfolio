"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-content";
import { ProjectCard } from "./ProjectCard";
import { SplitText } from "@/components/ui/SplitText";

export function Projects() {
  return (
    <section id="projects" className="relative min-h-screen bg-bg-secondary px-6 py-24">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent-primary/5 blur-[100px]" />
        <div className="absolute -left-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent-secondary/5 blur-[100px]" />
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
            My Work
          </motion.p>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            <SplitText
              text="Featured Projects"
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
            A collection of projects I&apos;ve worked on, showcasing my skills in
            full-stack development, mobile apps, and more.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://github.com/sivasuryaa-m-k"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-text-secondary/30 px-8 py-3 font-medium transition-all hover:border-accent-primary hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
            data-cursor="pointer"
          >
            View More on GitHub
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
