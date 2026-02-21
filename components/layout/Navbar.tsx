"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  FolderKanban,
  Code2,
  Briefcase,
  Users,
  Heart,
  Mail,
} from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio-content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  FolderKanban,
  Code2,
  Briefcase,
  Users,
  Heart,
  Mail,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.replace("#", ""));
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Vertical Sidebar - Hidden on mobile */}
      <motion.nav
        className="fixed left-0 top-0 z-50 hidden h-full w-20 flex-col items-center border-r border-white/10 bg-bg-primary/80 py-6 backdrop-blur-lg md:flex"
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo at top */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white font-display font-bold text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {personalInfo.name.charAt(0)}
        </motion.a>

        {/* Navigation items in middle */}
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          {navItems.map((item) => {
            const IconComponent = iconMap[item.icon] || Home;
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <div key={item.name} className="relative">
                <motion.a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? "bg-accent-primary/20 text-accent-primary"
                      : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                  {/* Active indicator on right edge */}
                  {isActive && (
                    <motion.div
                      className="absolute right-0 h-6 w-1 rounded-l-full bg-accent-primary"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.div
                      className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-bg-secondary px-3 py-1.5 text-sm font-medium text-text-primary shadow-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.name}
                      {/* Tooltip arrow */}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-bg-secondary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact CTA at bottom */}
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary text-white transition-all hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/25"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveredItem("contact-cta")}
          onMouseLeave={() => setHoveredItem(null)}
          aria-label="Contact Me"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
        </motion.a>

        {/* Contact CTA Tooltip */}
        <AnimatePresence>
          {hoveredItem === "contact-cta" && (
            <motion.div
              className="absolute bottom-6 left-full ml-3 whitespace-nowrap rounded-lg bg-bg-secondary px-3 py-1.5 text-sm font-medium text-text-primary shadow-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              Contact Me
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-bg-secondary" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Header - Hidden on desktop */}
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 md:hidden ${
          isScrolled
            ? "bg-bg-primary/80 backdrop-blur-lg shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="group flex items-center gap-2 font-display text-xl font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-primary"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {navItems.map((item, index) => {
                const IconComponent = iconMap[item.icon] || Home;

                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`flex items-center gap-3 text-2xl font-medium transition-colors ${
                      activeSection === item.href.replace("#", "")
                        ? "text-accent-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <IconComponent className="h-6 w-6" />
                    {item.name}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="mt-4 rounded-full bg-accent-primary px-8 py-3 text-lg font-medium text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
