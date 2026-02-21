"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp, Linkedin, Github, Mail } from "lucide-react";
import { personalInfo, socialLinks, navItems } from "@/data/portfolio-content";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-bg-secondary px-6 py-12">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-accent-primary/5 blur-[100px]" />
        <div className="absolute -right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-accent-secondary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="mb-4 inline-flex items-center gap-2 font-display text-xl font-bold"
              whileHover={{ scale: 1.02 }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white">
                {personalInfo.name.charAt(0)}
              </span>
              <span>
                <span className="text-text-primary">
                  {personalInfo.name.split(" ")[0]}
                </span>
                <span className="text-accent-primary">.</span>
              </span>
            </motion.a>
            <p className="mb-4 text-sm text-text-secondary">
              {personalInfo.title}
            </p>
            <p className="text-sm text-text-secondary/70">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-primary"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Connect
            </h3>
            <div className="mb-6 flex gap-3">
              {socialLinks.map((link) => {
                if (!link.url) return null;

                const IconComponent =
                  link.name === "LinkedIn"
                    ? Linkedin
                    : link.name === "GitHub"
                      ? Github
                      : Mail;

                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-secondary transition-all hover:border-accent-primary/50 hover:bg-accent-primary/10 hover:text-accent-primary"
                    whileHover={{ y: -2 }}
                    aria-label={link.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-sm text-text-secondary/70">
              {personalInfo.location}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="flex items-center gap-1 text-sm text-text-secondary/70">
            &copy; {currentYear} {personalInfo.name.split(" ")[0]}. Made with
            <Heart className="h-4 w-4 text-red-500" />
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-primary"
            whileHover={{ y: -2 }}
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-accent-primary/50 group-hover:bg-accent-primary/10">
              <ArrowUp className="h-4 w-4" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
