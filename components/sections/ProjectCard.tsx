"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Card3D } from "@/components/ui/Card3D";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Generate unique gradient based on project index
  const gradients = [
    "from-accent-primary/30 via-accent-secondary/20 to-accent-tertiary/30",
    "from-accent-secondary/30 via-accent-tertiary/20 to-accent-primary/30",
    "from-accent-tertiary/30 via-accent-primary/20 to-accent-secondary/30",
  ];
  const gradientClass = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Card3D
        className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary/50 shadow-xl shadow-black/10 backdrop-blur-sm transition-all hover:border-accent-primary/50 hover:shadow-accent-primary/5 focus-within:ring-2 focus-within:ring-accent-primary focus-within:ring-offset-2 focus-within:ring-offset-bg-secondary"
        rotateIntensity={8}
        scaleOnHover={1.02}
      >
        {/* Project Image / Placeholder */}
        <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${gradientClass}`}>
          {project.image && project.image.length > 0 ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            /* Enhanced placeholder with animated elements */
            <div className="flex h-full w-full items-center justify-center">
              {/* Decorative circles */}
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>

              {/* Project initial */}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <span className="text-3xl font-bold text-white/60">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />

          {/* Quick links overlay - visible on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.github && project.github.length > 0 && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-accent-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                data-cursor="pointer"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.live && project.live.length > 0 && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-accent-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                aria-label={`View ${project.title} live demo (opens in new tab)`}
                data-cursor="pointer"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {(!project.github || project.github.length === 0) && (!project.live || project.live.length === 0) && (
              <span className="text-sm text-text-secondary">Details coming soon</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title with arrow */}
          <div className="mb-3 flex items-start justify-between">
            <h3 className="font-display text-xl font-bold text-text-primary transition-colors group-hover:text-accent-primary">
              {project.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-text-secondary transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-primary" />
          </div>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>

          {/* Technologies */}
          <ul className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
            {project.technologies.slice(0, 4).map((tech) => (
              <li key={tech}>
                <span className="inline-block rounded-full bg-accent-primary/15 px-3 py-1 text-xs font-medium text-accent-primary">
                  {tech}
                </span>
              </li>
            ))}
            {project.technologies.length > 4 && (
              <li>
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-text-secondary">
                  +{project.technologies.length - 4} more
                </span>
              </li>
            )}
          </ul>
        </div>
      </Card3D>
    </motion.div>
  );
}
