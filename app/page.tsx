"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { personalInfo } from "@/data/portfolio-content";
import { SplitText, TextReveal } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Activities } from "@/components/sections/Activities";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

// Dynamically import 3D scene for performance
const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((mod) => ({
      default: mod.HeroScene,
    })),
  { ssr: false, loading: () => null }
);

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* 3D Background */}
        <HeroScene />

        {/* Fallback gradient (visible while 3D loads) */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent-primary/20 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-secondary/20 blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-text-secondary">
              {personalInfo.title}
            </p>
          </motion.div>

          {/* Main heading with split text animation */}
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
            <TextReveal delay={0.3}>
              <span>Hi, I&apos;m </span>
              <SplitText
                text={personalInfo.name.split(" ")[0]}
                delay={0.5}
                staggerDelay={0.04}
                animation="fadeUp"
                gradient
              />
            </TextReveal>
            <TextReveal delay={0.5}>
              <span className="block text-4xl md:text-5xl lg:text-6xl">
                <SplitText
                  text={personalInfo.tagline}
                  delay={0.7}
                  staggerDelay={0.02}
                  type="words"
                  animation="slideUp"
                />
              </span>
            </TextReveal>
          </h1>

          {/* Bio */}
          <motion.p
            className="mx-auto max-w-xl text-lg text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <MagneticButton
              onClick={() => scrollToSection("projects")}
              className="rounded-full bg-accent-primary px-6 py-3 font-medium transition-all hover:bg-accent-primary/80 hover:shadow-lg hover:shadow-accent-primary/25 focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary sm:px-8"
              strength={0.2}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection("contact")}
              className="rounded-full border border-text-secondary/50 px-6 py-3 font-medium transition-all hover:border-accent-primary hover:text-accent-primary focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary sm:px-8"
              strength={0.2}
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <MagneticButton
            onClick={() => scrollToSection("projects")}
            className="group flex flex-col items-center gap-2 text-text-secondary transition-colors hover:text-accent-primary"
            strength={0.4}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </MagneticButton>
        </motion.div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience />

      {/* Activities & Volunteering Section */}
      <Activities />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
