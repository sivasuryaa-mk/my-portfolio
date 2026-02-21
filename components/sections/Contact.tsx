"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio-content";
import { SplitText } from "@/components/ui/SplitText";
import { GlitchText } from "@/components/ui/GlitchText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-text-primary placeholder:text-text-secondary/50 transition-all duration-300 focus:border-accent-primary/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent-primary/20";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-accent-tertiary/5 blur-[150px]"
          animate={
            isInView
              ? {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent-primary/5 blur-[120px]"
          animate={
            isInView
              ? {
                  x: [0, -40, 0],
                  y: [0, 30, 0],
                }
              : {}
          }
          transition={{
            duration: 25,
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
            Get In Touch
          </motion.p>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            <SplitText
              text="Let's Work Together"
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
            Have a project in mind or just want to chat? Feel free to reach out.
            I&apos;m always open to discussing new opportunities.
          </motion.p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Glitch text heading */}
            <div className="mb-8">
              <GlitchText
                text="Say Hello"
                className="font-display text-3xl font-bold md:text-4xl"
              />
            </div>

            {/* Contact details */}
            <div className="mb-10 space-y-6">
              {personalInfo.email && (
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center gap-4 text-text-secondary transition-colors hover:text-accent-primary"
                  whileHover={{ x: 8 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-all group-hover:bg-accent-primary group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-text-secondary/70">
                      Email
                    </p>
                    <p className="font-medium text-text-primary">
                      {personalInfo.email || "Contact via LinkedIn"}
                    </p>
                  </div>
                </motion.a>
              )}

              <motion.div
                className="flex items-center gap-4 text-text-secondary"
                whileHover={{ x: 8 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-secondary/10 text-accent-secondary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-text-secondary/70">
                    Location
                  </p>
                  <p className="font-medium text-text-primary">
                    {personalInfo.location}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <p className="mb-4 text-sm uppercase tracking-wider text-text-secondary/70">
                Find me on
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => {
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
                      className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-text-secondary transition-all hover:border-accent-primary/50 hover:bg-accent-primary/10 hover:text-accent-primary"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                      aria-label={`Visit ${link.name}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Decorative element */}
            <motion.div
              className="mt-12 hidden lg:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="text-xs uppercase tracking-widest text-text-secondary/50">
                  or
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              {/* Form glow effect */}
              <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-accent-primary/20 via-transparent to-accent-tertiary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="space-y-6">
                {/* Name field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </motion.div>

                {/* Email field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="your@email.com"
                  />
                </motion.div>

                {/* Message field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className={`group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-medium transition-all ${
                      isSubmitted
                        ? "bg-green-500 text-white"
                        : "bg-accent-primary text-white hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/25"
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                    strength={0.15}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          ✓
                        </motion.span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </MagneticButton>
                </motion.div>
              </div>

              {/* Success message */}
              {isSubmitted && (
                <motion.p
                  className="mt-4 text-center text-sm text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
