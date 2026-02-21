"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio-content";
import { RollingText } from "@/components/ui/RollingText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CurvedNeonText } from "@/components/ui/CurvedNeonText";
import { GlitchText } from "@/components/ui/GlitchText";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Activities } from "@/components/sections/Activities";
import { Hobbies } from "@/components/sections/Hobbies";
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
  const [showRoles, setShowRoles] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const roles = ["Swift Developer", "AI Engineer"];

  useEffect(() => {
    // Show roles after name animation settles
    const timer = setTimeout(() => setShowRoles(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen md:pl-20">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex min-h-screen overflow-hidden px-6"
      >
        {/* 3D Background */}
        <HeroScene />

        {/* Fallback gradient (visible while 3D loads) */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent-primary/20 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-secondary/20 blur-[100px]" />
        </div>

        {/* Split Container */}
        <div className="relative z-10 flex w-full flex-col lg:flex-row lg:items-start lg:justify-between py-20">
          {/* LEFT SIDE - Existing Content */}
          <div className="flex flex-1 flex-col justify-center text-center lg:text-left lg:max-w-[55%]">
            {/* Subtitle - hidden placeholder to match alignment */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:mb-1"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-text-secondary">
                {personalInfo.title}
              </p>
            </motion.div>

            {/* Main heading with shimmer effect */}
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Hi, I&apos;m{" "}
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlitchText
                  text={personalInfo.name.split(" ")[0]}
                  className="shimmer-text"
                  glitchOnHover={true}
                />
              </motion.span>
              {showRoles && (
                <motion.span
                  className="block mt-6 text-3xl md:text-4xl lg:text-5xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <RollingText texts={roles} delay={0.2} typingSpeed={70} pauseDuration={2500} className="text-accent-tertiary font-semibold" />
                </motion.span>
              )}
            </h1>

            {/* Bio */}
            <motion.p
              className="max-w-xl text-lg text-text-secondary lg:mx-0 mx-auto leading-[1.7]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons with magnetic effect */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4 lg:justify-start justify-center"
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
                className="rounded-full border border-text-secondary/70 px-6 py-3 font-medium transition-all hover:border-accent-primary hover:text-accent-primary focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary sm:px-8"
                strength={0.2}
              >
                Contact Me
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Vector Image with Curved Text */}
          <div className="flex flex-1 items-start justify-center lg:justify-center mt-12 lg:mt-0 lg:pt-[111px]">
            <motion.div
              className="relative mt-[15px]"
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Curved Text SVG - positioned above vector image with pulsing glow */}
              <CurvedNeonText text="Think Big 💡" pulseGlow={!prefersReducedMotion} />

              {/* Vector Image - static */}
              <div className="relative">
                {/* Glow backdrop behind image */}
                <div className="absolute -inset-8 bg-gradient-to-br from-accent-primary/30 via-accent-secondary/20 to-accent-tertiary/30 rounded-full blur-3xl" />
                {/* Vector image - sized to fit viewport */}
                <Image
                  src="/assets/vectorImage/my_vector.png"
                  alt="Illustration representing creative thinking and innovation"
                  width={450}
                  height={450}
                  className="relative w-[250px] md:w-[300px] lg:w-[380px] xl:w-[450px] h-auto"
                  priority
                  unoptimized
                />
              </div>
            </motion.div>
          </div>
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

      {/* Hobbies Section */}
      <Hobbies />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
